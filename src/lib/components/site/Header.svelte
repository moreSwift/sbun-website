<script lang="ts">
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import Heart from 'phosphor-svelte/lib/Heart';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import Logo from './Logo.svelte';
	import { githubUrl, openCollectiveUrl, release } from '$lib/content';

	const nav = [
		{ label: 'Adoption', href: '#adoption' },
		{ label: 'What’s new', href: '#whats-new' },
		{ label: 'In the wild', href: '#apps' },
		{ label: 'FAQs', href: '#faq' },
	];
</script>

<div class="relative z-50 bg-plum text-cream">
	<div
		class="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center"
	>
		<p class="normal-case text-[10px] text-cream/90 sm:text-[13px]">
			<span class="font-semibold text-cream">{release.version} out now<span class="hidden sm:inline">:</span></span>
			<span class="hidden sm:inline">bringing Windows, Linux & Android support, and much much more...</span>
		</p>
		<a
			href="{githubUrl}/releases/tag/{release.tag}"
			class="normal-case group inline-flex items-center gap-1 text-[10px] text-peach underline decoration-peach/40 underline-offset-4 hover:text-cream sm:text-[13px] font-semibold"
			target="_blank"
		>
			View release notes
			<ArrowUpRight class="size-3" />
		</a>
	</div>
</div>

<header
	class="sticky top-0 z-40 border-b border-plum/15 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75"
>
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
		<a href="/" class="group flex items-center gap-3" aria-label="Swift Bundler home">
			<Logo size={38} class="transition-transform group-hover:-rotate-6" />
			<span class="flex items-center gap-2">
				<span
					class="whitespace-nowrap font-display text-[15px] font-semibold tracking-[-0.02em] text-plum min-[360px]:text-[17px] sm:text-lg"
				>
					Swift Bundler
				</span>
				<Badge
					variant="site"
					size="default"
					class="hidden text-[14px] sm:inline-flex"
				>
					v{release.version}
				</Badge>
			</span>
		</a>

		<nav class="hidden items-center font-medium gap-5 md:flex" aria-label="Main">
			{#each nav as item}
				<a
					href={item.href}
					class="text-[14px] text-plum/85 transition-colors hover:text-plum"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1">
			<a
				href="https://docs.swiftbundler.dev/documentation/swift-bundler"
				class="inline-flex h-9 font-medium items-center px-1 text-[14px] text-plum/85 hover:text-plum"
			>
				Docs
			</a>
			<a
				href={openCollectiveUrl}
				class="hidden size-9 items-center justify-center border border-transparent text-rose-deep transition-colors hover:border-rose/30 hover:bg-rose/10 hover:text-plum sm:inline-flex"
				aria-label="Sponsor Swift Bundler"
				title="Sponsor Swift Bundler"
			>
				<Heart class="size-5" />
			</a>
			<a
				href={githubUrl}
				class="hidden size-9 items-center justify-center border border-transparent text-plum/85 transition-colors hover:border-plum/20 hover:bg-rose/10 hover:text-plum sm:inline-flex"
				aria-label="Swift Bundler on GitHub"
			>
				<GithubLogo class="size-5" />
			</a>
			<Button
				href="#install"
				size="lg"
				class="h-9 bg-plum px-4 text-[14px] text-cream hover:bg-plum/90"
			>
				Install
			</Button>
		</div>
	</div>
</header>
