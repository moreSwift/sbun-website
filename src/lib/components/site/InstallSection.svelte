<script lang="ts">
	import { onMount } from 'svelte';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardHeader } from '$lib/components/ui/card';
	import InstallCommand from './InstallCommand.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import { githubUrl } from '$lib/content';
	import { refreshLatestRelease } from '$lib/latest-release';
	import type { LatestRelease } from '$lib/release';

	let { latest: prerendered }: { latest: LatestRelease } = $props();

	// Start with the build-time links (so they work without JavaScript) and
	// upgrade to the live release in the browser.
	let refreshed = $state<LatestRelease | null>(null);
	const latest = $derived(refreshed ?? prerendered);

	onMount(() => {
		let cancelled = false;

		refreshLatestRelease().then((fresh) => {
			if (fresh && !cancelled) refreshed = fresh;
		});

		return () => {
			cancelled = true;
		};
	});

	const downloadGroups = $derived([
		{
			name: 'macOS',
			meta: 'Universal installer · macOS 13+',
			icon: AppleLogo,
			files: [{ label: '.pkg', href: latest.artifacts.macos }]
		},
		{
			name: 'Linux',
			meta: 'x86_64 · statically linked',
			icon: LinuxLogo,
			files: [
				{ label: '.deb', href: latest.artifacts.deb },
				{ label: '.rpm', href: latest.artifacts.rpm },
				{ label: '.tar.gz', href: latest.artifacts.tarball }
			]
		},
		{
			name: 'Windows',
			meta: 'x86_64 · Windows 10+',
			icon: WindowsLogo,
			files: [
				{ label: '.msi', href: latest.artifacts.msi },
				{ label: '.zip', href: latest.artifacts.zip }
			]
		}
	]);
</script>

<PageSection id="install" grid gridClass="opacity-40" class="overflow-hidden">
	<SectionHeading
		title="Install Swift Bundler."
		intro="Pre-built packages for macOS, Linux and Windows."
	>
		{#snippet action()}
			<p class="font-mono text-[11px] text-plum/50">
				Latest: v{latest.version} · {latest.date} · <a
					href="{githubUrl}/releases"
					class="underline decoration-plum/25 underline-offset-4 hover:text-plum">all releases</a
				>
			</p>
		{/snippet}
	</SectionHeading>

	<div class="mt-8 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
		<SiteCard variant="muted" class="flex flex-col">
			<CardHeader class="px-5 pb-0 pt-5">
				<Badge variant="accent" size="xs" class="mb-2 w-fit font-mono uppercase"
					>Recommended</Badge
				>
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
					Install with one command
				</h3>
			</CardHeader>
			<CardContent class="px-5 pb-5 pt-3">
				<p class="text-[13px] leading-relaxed text-plum/85">
					The command detects your platform, downloads the right installer and installs it for you. Our installers all install an
					<code class="font-mono text-[12px] text-rose-deep">sbun</code> alias alongside <code class="font-mono text-[12px] text-rose-deep">swift-bundler</code>.
				</p>
				<InstallCommand />
			</CardContent>
		</SiteCard>

		<SiteCard variant="muted" class="flex flex-col">
			<CardHeader class="px-5 pb-0 pt-5">
				<Badge variant="site" size="xs" class="mb-2 w-fit font-mono uppercase">Manual</Badge>
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
					Manual installation
				</h3>
			</CardHeader>
			<CardContent class="flex flex-1 flex-col px-5 pb-5 pt-3">
				<p class="text-[13px] leading-relaxed text-plum/85">
					Prefer to manage the download yourself? Grab a release artifact directly.
				</p>

				<div class="mt-4">
					{#each downloadGroups as group}
						{@const Icon = group.icon}
						<div class="flex flex-wrap items-center justify-between gap-3 border-t border-plum/15 py-3 first:border-t-0 first:pt-0">
							<div>
								<div class="flex items-center gap-2">
									<Icon class="size-4 text-plum/70" weight="fill" />
									<span class="font-display text-sm font-semibold text-plum">{group.name}</span>
								</div>
								<p class="mt-0.5 font-mono text-[11px] text-plum/45">{group.meta}</p>
							</div>
							<div class="flex flex-wrap justify-end gap-1.5">
								{#each group.files as file}
									<Badge
										href={file.href}
										variant="site"
										size="default"
										class="gap-1 font-mono"
									>
										<DownloadSimple class="size-3" />
										{file.label}
									</Badge>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</CardContent>
		</SiteCard>
	</div>
</PageSection>
