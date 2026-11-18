<script lang="ts">
	import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
	import DiscordLogo from 'phosphor-svelte/lib/DiscordLogo';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import { Separator } from '$lib/components/ui/separator';
	import { buildCommit } from '$lib/commit';
	import Barcode from './Barcode.svelte';
	import BarcodePlaceholder from './BarcodePlaceholder.svelte';
	import DotGrid from './DotGrid.svelte';
	import Logo from './Logo.svelte';
	import {
		discordUrl,
		githubUrl,
		openCollectiveUrl,
		release
	} from '$lib/content';

	const columns = [
		{
			title: 'Product',
			links: [
				{ label: 'Documentation', href: '/documentation/swift-bundler' },
				{ label: 'Configuration', href: '/documentation/swift-bundler/configuration' },
				{ label: 'Bundlers', href: '/documentation/swift-bundler/bundlers' },
				{ label: 'Templates', href: '/documentation/swift-bundler/package-templates' }
			]
		},
		{
			title: 'Release',
			links: [
				{ label: `What’s new in ${release.version}`, href: `${githubUrl}/releases/tag/${release.tag}` },
				{ label: 'Migrating from v2', href: '/documentation/swift-bundler/migrating-to-swift-bundler' },
				{ label: 'All releases', href: `${githubUrl}/releases` },
				{ label: 'Installation', href: '/documentation/swift-bundler/installation' }
			]
		},
		{
			title: 'Community',
			links: [
				{ label: 'GitHub', href: githubUrl },
				{ label: 'Discord', href: discordUrl },
				{ label: 'Open Collective', href: openCollectiveUrl },
				{ label: 'Contributing', href: `${githubUrl}/blob/main/CONTRIBUTING.md` }
			]
		}
	];
</script>

<footer class="relative overflow-hidden bg-plum text-cream">
	<DotGrid class="opacity-[0.06]" />

	<div class="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
		<div class="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
			<div>
				<div class="flex items-center gap-3">
					<Logo size={54} />
					<div>
						<p class="font-display text-xl font-semibold tracking-tight">Swift Bundler</p>
						<p class="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/55">
							Ship Swift anywhere.
						</p>
					</div>
				</div>
				<p class="mt-5 max-w-sm text-[13px] leading-relaxed text-cream/75">
					An Xcodeproj-less tool for creating cross-platform Swift apps. Made by
					<a href="https://moreswift.dev" class="text-peach underline decoration-peach/30 underline-offset-4 hover:text-cream">moreSwift</a>.
				</p>
				<div class="mt-5 flex flex-wrap gap-2">
					<a
						href={githubUrl}
						class="inline-flex items-center gap-1.5 border border-cream/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
					>
						<GithubLogo class="size-3.5" /> GitHub
					</a>
					<a
						href={discordUrl}
						class="inline-flex items-center gap-1.5 border border-cream/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
					>
						<DiscordLogo class="size-3.5" /> Discord
					</a>
					<a
						href={openCollectiveUrl}
						class="inline-flex items-center gap-1.5 border border-cream/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
					>
						Sponsor
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
				{#each columns as column}
					<div>
						<p class="label-type text-cream/35">{column.title}</p>
						<ul class="mt-3 space-y-2">
							{#each column.links as link}
								<li>
									<a
										href={link.href}
										class="text-[12px] text-cream/75 transition-colors hover:text-cream"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<Separator class="mt-12 bg-cream/15" />

		<div
			class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
		>
			<div class="flex items-center gap-4">
				<div class="w-36">
					{#if $buildCommit.status === 'scanning'}
						<BarcodePlaceholder height={26} light />
					{:else}
						<Barcode
							value={$buildCommit.value}
							height={26}
							light
							quietZone={0}
							class="animate-in fade-in opacity-40 duration-300"
						/>
					{/if}
				</div>
				<div>
					<p class="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35">
						MIT licensed · © {new Date().getFullYear()} moreSwift
					</p>
					<p class="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/25">
						SBUN-{release.version} · MADE IN SWIFT
					</p>
				</div>
			</div>
			<a
				href="#top"
				class="label-type group inline-flex items-center gap-1.5 text-cream/55 hover:text-cream"
			>
				Back to the top
				<span
					class="flex size-6 items-center justify-center border border-cream/20 transition-colors group-hover:border-cream/50"
				>
					<ArrowUp class="size-3" />
				</span>
			</a>
		</div>
	</div>
</footer>
