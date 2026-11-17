<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import BookOpen from 'phosphor-svelte/lib/BookOpen';
	import Check from 'phosphor-svelte/lib/Check';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import DotGrid from './DotGrid.svelte';
	import InstallCommand from './InstallCommand.svelte';
	import PlatformStrip from './PlatformStrip.svelte';
	import ShippingLabel from './ShippingLabel.svelte';
	import { artifacts, githubUrl, release } from '$lib/content';

	let os = $state<'macos' | 'windows' | 'linux'>('macos');

	onMount(() => {
		const ua = navigator.userAgent.toLowerCase();
		if (ua.includes('windows')) os = 'windows';
		else if (ua.includes('linux') && !ua.includes('android')) os = 'linux';
	});

	const downloadHref = $derived(
		os === 'windows' ? artifacts.msi : os === 'linux' ? artifacts.deb : artifacts.macos
	);

	const downloadLabel = $derived(
		`Download for ${os === 'windows' ? 'Windows' : os === 'linux' ? 'Linux' : 'macOS'}`
	);

	const trust = ['MIT licensed', 'Swift 6', 'Signed installers', 'No .xcodeproj'];

</script>

<section class="relative overflow-hidden border-b border-plum/15">
	<DotGrid class="opacity-50" />
	<div
		class="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full bg-rose/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-peach-deep/30 blur-3xl"
	></div>

	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		<div
			class="grid gap-14 py-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-12 lg:py-20"
		>
			<div class="min-w-0">
				<div class="flex flex-wrap items-center gap-3">
					<Badge
						variant="site"
						class="gap-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
					>
						<span class="size-1.5 rounded-full bg-rose"></span>
						v{release.version}
					</Badge>
					<span class="label-type text-plum/70">Windows · Linux · Android · Hot reload</span>
				</div>

				<h1
					class="mt-6 font-display text-[2.7rem] font-bold leading-[0.94] tracking-[-0.045em] text-plum sm:text-[3.6rem] md:text-[4.35rem]"
				>
					Ship Swift<br />
					<span
						class="relative -mr-3 inline-block -rotate-1 border-2 border-rose-deep bg-paper px-3 py-0.5 leading-[1.02] shadow-[5px_5px_0_rgba(112,55,77,0.14)]"
					>
						anywhere.
					</span>
				</h1>

				<p class="mt-6 max-w-xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
					Swift Bundler turns Swift Package Manager executables into signed, distributable
					apps for seven platforms. One TOML file. Real installers. No Xcode project to
					maintain.
				</p>

				<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
					<Button
						href={downloadHref}
						size="lg"
						class="h-11 gap-2 bg-plum px-5 text-[13px] font-semibold text-cream hover:bg-plum/90"
					>
						<DownloadSimple class="size-4" weight="bold" />
						{downloadLabel}
					</Button>
					<Button
						href="/documentation/swift-bundler/creating-an-app"
						variant="outline"
						size="lg"
						class="h-11 gap-2 border-plum/30 bg-transparent px-5 text-[13px] font-semibold text-plum hover:bg-paper"
					>
						<BookOpen class="size-4" />
						Read the docs
					</Button>
				</div>

				<div class="max-w-lg">
					<InstallCommand />
				</div>

				<ul class="mt-8 flex flex-wrap gap-x-5 gap-y-2">
					{#each trust as item}
						<li class="flex items-center gap-1.5 font-mono text-[10px] text-plum/75">
							<Check class="size-3 text-rose-deep" weight="bold" />
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div class="relative min-w-0 px-2 sm:px-0 lg:pl-4">
				<ShippingLabel />
				<a
					href="{githubUrl}/releases/tag/{release.tag}"
					class="label-type group absolute -bottom-7 right-2 hidden items-center gap-1 text-muted-foreground hover:text-plum sm:inline-flex"
				>
					View 3.0.0 release notes
					<ArrowUpRight class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</a>
			</div>
		</div>
	</div>

	<PlatformStrip />
</section>
