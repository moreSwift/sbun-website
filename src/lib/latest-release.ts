import type { GitHubRelease, LatestRelease } from './release';
import { latestReleaseUrl, parseGitHubRelease } from './release';

const STORAGE_KEY = 'sbun:latest-release';
const CACHE_TTL_MS = 10 * 60 * 1000;

type CachedRelease = { expires: number; release: LatestRelease };

/**
 * Re-fetch the latest release in the browser so the download card updates as
 * soon as a release is published, without waiting for a redeploy.
 *
 * Returns `null` when nothing usable came back, in which case the component
 * keeps the links it was prerendered with.
 */
export async function refreshLatestRelease(): Promise<LatestRelease | null> {
	const cached = readCache();
	if (cached) return cached;

	try {
		// GitHub's API sends `access-control-allow-origin: *`, so no proxy is needed.
		const response = await fetch(latestReleaseUrl, {
			headers: { accept: 'application/vnd.github+json' }
		});
		if (!response.ok) {
			throw new Error(`GitHub API responded with ${response.status} ${response.statusText}`);
		}

		const release = parseGitHubRelease((await response.json()) as GitHubRelease);
		writeCache(release);
		return release;
	} catch (cause) {
		console.warn(
			`[release] Could not refresh the latest release from GitHub (${(cause as Error).message}). ` +
				'Keeping the build-time links.'
		);
		return null;
	}
}

function readCache(): LatestRelease | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;

		const cached = JSON.parse(raw) as CachedRelease;
		if (cached.expires < Date.now()) return null;

		return cached.release;
	} catch {
		return null;
	}
}

function writeCache(release: LatestRelease): void {
	try {
		const cached: CachedRelease = { expires: Date.now() + CACHE_TTL_MS, release };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
	} catch {
		// Storage can be unavailable (private mode, quota); the fetch still worked.
	}
}
