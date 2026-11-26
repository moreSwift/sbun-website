import { getLatestRelease } from '$lib/server/latest-release';

export async function load({ fetch }) {
	return {
		latestRelease: await getLatestRelease(fetch)
	};
}
