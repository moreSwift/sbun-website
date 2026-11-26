import { artifacts, release, repository } from './content';

export type ArtifactKey = keyof typeof artifacts;
export type Artifacts = Record<ArtifactKey, string>;

export type LatestRelease = {
	version: string;
	date: string;
	artifacts: Artifacts;
};

export type GitHubRelease = {
	tag_name: string;
	published_at: string | null;
	created_at: string;
	assets: { name: string; browser_download_url: string }[];
};

export const latestReleaseUrl = `https://api.github.com/repos/${repository}/releases/latest`;

/** Used when the GitHub API is unreachable or its latest release has no installers. */
export const fallbackRelease: LatestRelease = {
	version: release.version,
	date: release.date,
	artifacts
};

const matchers: [ArtifactKey, (name: string) => boolean][] = [
	['macos', (name) => name.endsWith('.pkg')],
	['deb', (name) => name.endsWith('.deb')],
	['rpm', (name) => name.endsWith('.rpm')],
	['tarball', (name) => name.endsWith('.tar.gz')],
	['msi', (name) => name.endsWith('.msi')],
	['zip', (name) => name.endsWith('.zip')]
];

/**
 * Map a GitHub release's assets onto the download card's slots, keyed by file
 * extension.
 *
 * Throws if any slot can't be filled: mixing assets from one release with links
 * from another would be worse than ignoring the release.
 */
export function parseGitHubRelease(data: GitHubRelease): LatestRelease {
	const found: Partial<Artifacts> = {};

	for (const asset of data.assets ?? []) {
		for (const [key, matches] of matchers) {
			if (!(key in found) && matches(asset.name)) {
				found[key] = asset.browser_download_url;
			}
		}
	}

	const missing = (Object.keys(fallbackRelease.artifacts) as ArtifactKey[]).filter(
		(key) => !(key in found)
	);
	if (missing.length > 0) {
		throw new Error(
			`release ${data.tag_name} doesn't publish ${missing.join(', ')} (looked for .pkg, .deb, .rpm, .tar.gz, .msi and .zip assets)`
		);
	}

	return {
		version: data.tag_name.replace(/^v/, ''),
		date: formatMonthYear(data.published_at ?? data.created_at),
		artifacts: found as Artifacts
	};
}

function formatMonthYear(iso: string | null | undefined): string {
	const date = iso ? new Date(iso) : new Date();
	if (Number.isNaN(date.getTime())) return fallbackRelease.date;

	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date);
}
