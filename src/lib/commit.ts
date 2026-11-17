import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const FALLBACK_COMMIT = __SBUN_COMMIT__.toUpperCase();
const CACHE_KEY = 'sbun-main-commit';
const MIN_SCANNING_TIME = 900;

export type CommitState = {
	status: 'scanning' | 'ready';
	value: string;
};

export const buildCommit = writable<CommitState>({
	status: 'scanning',
	value: FALLBACK_COMMIT
});

let refreshStarted = false;

function readCachedCommit(): string | null {
	try {
		const cached = sessionStorage.getItem(CACHE_KEY);
		return cached && /^[0-9A-F]{7}$/.test(cached) ? cached : null;
	} catch {
		return null;
	}
}

/**
 * Resolve the latest short hash of main in the browser. The build-time value
 * is only used as a fallback after the scanning state has had time to read.
 */
export async function refreshBuildCommit() {
	if (!browser || refreshStarted) return;
	refreshStarted = true;

	const startedAt = Date.now();
	let commit = readCachedCommit();

	if (!commit) {
		try {
			const response = await fetch(
				'https://api.github.com/repos/moreSwift/swift-bundler/commits/main',
				{
					headers: { Accept: 'application/vnd.github+json' },
					cache: 'no-store',
					signal: AbortSignal.timeout(4000)
				}
			);

			if (response.ok) {
				const data = (await response.json()) as { sha?: string };
				const hash = String(data.sha ?? '')
					.slice(0, 7)
					.toUpperCase();

				if (/^[0-9A-F]{7}$/.test(hash)) {
					commit = hash;
					try {
						sessionStorage.setItem(CACHE_KEY, hash);
					} catch {
						// Caching is optional.
					}
				}
			}
		} catch {
			// Fall through to the build-time value.
		}
	}

	const remaining = MIN_SCANNING_TIME - (Date.now() - startedAt);
	if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));

	buildCommit.set({
		status: 'ready',
		value: commit ?? FALLBACK_COMMIT
	});
}
