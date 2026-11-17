import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const FALLBACK_COMMIT = __SBUN_COMMIT__.toUpperCase();
const CACHE_KEY = 'sbun-main-commit';

export const buildCommit = writable(FALLBACK_COMMIT);

let refreshStarted = false;

/**
 * Refresh the build commit from main in the browser, while retaining the
 * build-time value as an immediate and offline-safe fallback.
 */
export async function refreshBuildCommit() {
	if (!browser || refreshStarted) return;
	refreshStarted = true;

	try {
		const cached = sessionStorage.getItem(CACHE_KEY);
		if (cached && /^[0-9A-F]{7}$/.test(cached)) {
			buildCommit.set(cached);
			return;
		}
	} catch {
		// sessionStorage can be unavailable in privacy modes.
	}

	try {
		const response = await fetch(
			'https://api.github.com/repos/moreSwift/swift-bundler/commits/main',
			{
				headers: { Accept: 'application/vnd.github+json' },
				cache: 'no-store'
			}
		);
		if (!response.ok) return;

		const data = (await response.json()) as { sha?: string };
		const hash = String(data.sha ?? '')
			.slice(0, 7)
			.toUpperCase();

		if (/^[0-9A-F]{7}$/.test(hash)) {
			buildCommit.set(hash);
			try {
				sessionStorage.setItem(CACHE_KEY, hash);
			} catch {
				// Cache is optional.
			}
		}
	} catch {
		// Keep the build-time fallback if the network request fails.
	}
}
