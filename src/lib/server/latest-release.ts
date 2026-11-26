import type { GitHubRelease, LatestRelease } from '$lib/release';
import { fallbackRelease, parseGitHubRelease } from '$lib/release';
import { repository } from '$lib/content';

const API_URL =
	process.env.SBUN_RELEASE_API_URL ??
	`https://api.github.com/repos/${repository}/releases/latest`;

/** Avoid burning through GitHub's unauthenticated rate limit while developing. */
const CACHE_TTL_MS = 10 * 60 * 1000;

let cache: { expires: number; release: LatestRelease } | undefined;

/**
 * Fetch the latest published release at build time so the prerendered HTML has
 * working links even without JavaScript.
 *
 * The browser re-fetches this on mount (see `$lib/latest-release.ts`) so new
 * releases show up without rebuilding; this only needs to be a sane baseline.
 * Falls back to the version pinned in `content.ts` on any failure.
 */
export async function getLatestRelease(fetcher: typeof fetch = fetch): Promise<LatestRelease> {
	const now = Date.now();
	if (cache && cache.expires > now) return cache.release;

	const token = process.env.GITHUB_TOKEN;
	const headers: Record<string, string> = {
		accept: 'application/vnd.github+json',
		'user-agent': 'sbun-website'
	};
	if (token) headers.authorization = `Bearer ${token}`;

	let release: LatestRelease;
	try {
		const response = await fetcher(API_URL, { headers });
		if (!response.ok) {
			throw new Error(`GitHub API responded with ${response.status} ${response.statusText}`);
		}

		release = parseGitHubRelease((await response.json()) as GitHubRelease);
	} catch (cause) {
		console.warn(
			`[release] Could not use the latest GitHub release (${(cause as Error).message}). ` +
				`Falling back to v${fallbackRelease.version}.`
		);
		release = fallbackRelease;
	}

	cache = { release, expires: now + CACHE_TTL_MS };
	return release;
}
