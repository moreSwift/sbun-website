<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import Logo from './Logo.svelte';
	import { githubUrl, release } from '$lib/content';

	const nav = [
		{ label: 'What’s new', href: '#whats-new' },
		{ label: 'Platforms', href: '#platforms' },
		{ label: 'Install', href: '#install' },
		{ label: 'Docs', href: '/documentation/swift-bundler' }
	];
</script>

<div class="relative z-50 bg-plum text-cream">
	<div
		class="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center"
	>
		<span class="size-1.5 shrink-0 animate-pulse rounded-full bg-rose" aria-hidden="true"
		></span>
		<p class="label-type text-[10px] text-cream/90 sm:text-[11px]">
			<span class="font-semibold text-cream">{release.version} is out</span>
			<span class="hidden sm:inline"> — Windows, Linux, Android and hot reload</span>
		</p>
		<a
			href="{githubUrl}/releases/tag/{release.tag}"
			class="label-type group ml-1 inline-flex items-center gap-1 text-[10px] text-peach underline decoration-peach/40 underline-offset-4 hover:text-cream sm:text-[11px]"
		>
			Release notes
			<ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>
</div>

<header
	class="sticky top-0 z-40 border-b border-plum/15 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75"
>
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
		<a href="/" class="group flex items-center gap-3" aria-label="Swift Bundler home">
			<Logo size={38} class="transition-transform group-hover:-rotate-6" />
			<span class="flex items-baseline gap-2">
				<span class="font-display text-[17px] font-semibold tracking-[-0.02em] text-plum sm:text-lg">
					Swift Bundler
				</span>
				<Badge
					variant="site"
					size="sm"
					class="hidden font-mono text-[9px] tracking-[0.1em] sm:inline-flex"
				>
					v{release.version}
				</Badge>
			</span>
		</a>

		<nav class="hidden items-center gap-7 md:flex" aria-label="Main">
			{#each nav as item}
				<a
					href={item.href}
					class="label-type text-[11px] text-plum/85 transition-colors hover:text-plum"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a
				href="/documentation/swift-bundler"
				class="label-type inline-flex h-9 items-center px-1 text-[10px] text-plum/85 hover:text-plum md:hidden"
			>
				Docs
			</a>
			<a
				href={githubUrl}
				class="hidden size-9 items-center justify-center border border-transparent text-plum/85 transition-colors hover:border-plum/20 hover:bg-paper hover:text-plum sm:inline-flex"
				aria-label="Swift Bundler on GitHub"
			>
				<GithubLogo class="size-4" />
			</a>
			<Button
				href="#install"
				size="lg"
				class="h-9 bg-plum px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-cream hover:bg-plum/90"
			>
				Install
			</Button>
		</div>
	</div>
</header>
