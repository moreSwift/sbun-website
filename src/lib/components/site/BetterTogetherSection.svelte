<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Devices from 'phosphor-svelte/lib/Devices';
	import Plugs from 'phosphor-svelte/lib/Plugs';
	import Plus from 'phosphor-svelte/lib/Plus';
	import Sliders from 'phosphor-svelte/lib/Sliders';
	import type { Component } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import {
		swiftCrossUiQuickStartUrl,
		swiftCrossUiUrl
	} from '$lib/content';
	import PageSection from './PageSection.svelte';

	const desktopPreviews = [
		{
			id: 'macos',
			label: 'macOS',
			src: '/showcase/music-player-macos.webp',
			alt: 'MusicPlayerExample running on macOS'
		},
		{
			id: 'windows',
			label: 'Windows',
			src: '/showcase/music-player-windows.webp',
			alt: 'MusicPlayerExample running on Windows'
		},
		{
			id: 'linux',
			label: 'Linux',
			src: '/showcase/music-player-linux.webp',
			alt: 'MusicPlayerExample running on Linux'
		}
	];

	const mobilePreviews = [
		{
			id: 'ios',
			label: 'iOS',
			kind: 'ios',
			src: '/showcase/music-player-ios.webp',
			alt: 'MusicPlayerExample running on an iPhone',
			height: 1200
		},
		{
			id: 'android',
			label: 'Android',
			kind: 'android',
			src: '/showcase/music-player-android.webp',
			alt: 'MusicPlayerExample running on Android',
			height: 1229
		}
	];

	let selectedDesktop = $state('macos');
	let selectedMobile = $state('ios');

	const currentDesktop = $derived(
		desktopPreviews.find((preview) => preview.id === selectedDesktop) ?? desktopPreviews[0]
	);
	const currentMobile = $derived(
		mobilePreviews.find((preview) => preview.id === selectedMobile) ?? mobilePreviews[0]
	);
	const isAndroid = $derived(currentMobile.kind === 'android');

	const points: { title: string; body: string; icon: Component }[] = [
		{
			title: 'Platform config, solved',
			body: 'Custom URL schemes, mobile permissions, entitlements and signing stay together in one Bundler.toml.',
			icon: Sliders
		},
		{
			title: 'One UI API, native everywhere',
			body: 'SwiftCrossUI maps the same views and state to each platform’s native controls and conventions.',
			icon: Devices
		},
		{
			title: 'System integration, coordinated',
			body: 'Swift Bundler embeds your application identifier. On Linux, SwiftCrossUI uses it to register with D-Bus app activation.',
			icon: Plugs
		}
	];
</script>

<PageSection id="better-together">
	<div class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-12">
		<div class="min-w-0">
			<div class="flex items-center gap-3">
				<span
					class="grid size-8 shrink-0 place-items-center border border-plum/20 bg-paper/60 text-rose-deep"
				>
					<Plus class="size-3.5" weight="bold" aria-hidden="true" />
				</span>
				<span class="label-type text-rose-deep">Better together</span>
				<Separator class="hidden h-px flex-1 bg-plum/20 sm:block" />
			</div>

			<h2
				class="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-4xl md:text-[2.9rem]"
			>
				SwiftCrossUI + Swift Bundler
			</h2>

			<p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
				SwiftCrossUI gives you a unified, SwiftUI-style API for building native apps.
				Swift Bundler handles the platform-specific details that make those apps real:
				custom URL schemes, mobile permissions, signing and installers.
			</p>

			<ul class="mt-6 space-y-4">
				{#each points as point}
					{@const Icon = point.icon}
					<li class="flex items-start gap-3">
						<span
							class="mt-0.5 grid size-8 shrink-0 place-items-center border border-plum/20 bg-paper/60 text-rose-deep"
						>
							<Icon class="size-4" weight="fill" aria-hidden="true" />
						</span>
						<div>
							<p class="font-display text-[15px] font-semibold text-plum">{point.title}</p>
							<p class="mt-0.5 text-[13px] leading-relaxed text-plum/80">{point.body}</p>
						</div>
					</li>
				{/each}
			</ul>

			<blockquote class="mt-7 border-l-2 border-rose bg-rose/5 px-4 py-3">
				<p class="font-display text-[17px] font-medium leading-relaxed text-plum">
					“If you’re targeting seven platforms with Swift, there’s really only one option,
					and that’s SwiftCrossUI + Swift Bundler.”
				</p>
			</blockquote>

			<div
				class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center"
			>
				<Button
					href={swiftCrossUiUrl}
					target="_blank"
					rel="noreferrer"
					class="h-11 gap-2 rounded-none bg-plum px-5 text-[13px] font-semibold text-cream hover:bg-plum/90"
				>
					Explore SwiftCrossUI
					<ArrowUpRight class="size-4" aria-hidden="true" />
				</Button>
				<a
					href={swiftCrossUiQuickStartUrl}
					target="_blank"
					rel="noreferrer"
					class="label-type group inline-flex items-center gap-1 text-rose-deep hover:text-plum"
				>
					Start with the SwiftCrossUI template
					<ArrowRight
						class="size-3.5 transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</a>
			</div>
		</div>

		<figure class="min-w-0">
			<div class="relative pb-7 pl-3 sm:pb-8 sm:pl-4">
				<div
					class="border border-plum/20 bg-paper/60 p-2 shadow-[6px_6px_0_rgba(112,55,77,0.10)] sm:p-3"
				>
					<div class="border-b border-plum/15 px-1 pb-2.5">
						<div class="flex items-center justify-between gap-2">
							<span
								class="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-plum"
							>
								MusicPlayerExample
							</span>
							<Badge
								variant="site"
								size="xs"
								class="font-mono uppercase tracking-[0.12em]"
							>
								{currentDesktop.label} + {currentMobile.label}
							</Badge>
						</div>

						<div class="mt-2 flex items-center justify-between gap-2">
							<Tabs bind:value={selectedDesktop} class="gap-0">
								<TabsList
									aria-label="Desktop platform"
									class="h-7 min-h-0 gap-0.5 border border-plum/15 bg-cream/60 p-[3px]"
								>
									{#each desktopPreviews as preview}
										<TabsTrigger
											value={preview.id}
											class="h-5 flex-none border border-transparent px-1.5 py-0 font-mono text-[9px] sm:px-2 tracking-[0.02em] text-plum/60 hover:bg-plum/5 hover:text-plum data-active:border-plum data-active:bg-plum data-active:text-cream data-active:hover:bg-plum data-active:hover:text-cream"
										>
											{preview.label}
										</TabsTrigger>
									{/each}
								</TabsList>
							</Tabs>

							<span class="h-4 w-px shrink-0 bg-plum/15" aria-hidden="true"></span>

							<Tabs bind:value={selectedMobile} class="gap-0">
								<TabsList
									aria-label="Mobile platform"
									class="h-7 min-h-0 gap-0.5 border border-plum/15 bg-cream/60 p-[3px]"
								>
									{#each mobilePreviews as preview}
										<TabsTrigger
											value={preview.id}
											class="h-5 flex-none border border-transparent px-1.5 py-0 font-mono text-[9px] sm:px-2 tracking-[0.02em] text-plum/60 hover:bg-plum/5 hover:text-plum data-active:border-plum data-active:bg-plum data-active:text-cream data-active:hover:bg-plum data-active:hover:text-cream"
										>
											{preview.label}
										</TabsTrigger>
									{/each}
								</TabsList>
							</Tabs>
						</div>
					</div>
					<div class="mt-2 overflow-hidden border border-plum/15 bg-code">
						{#key currentDesktop.id}
							<img
								src={currentDesktop.src}
								alt={currentDesktop.alt}
								width="1600"
								height="1040"
								class="block w-full animate-in fade-in duration-200"
								loading="eager"
								decoding="async"
							/>
						{/key}
					</div>
				</div>

			<div
				class="absolute -bottom-1 left-0 z-10 w-[27%] max-w-[7.5rem] rotate-[-3deg] {isAndroid
					? 'rounded-[0.65rem]'
					: 'rounded-[1.15rem]'} border-[3px] border-plum bg-plum p-[3px] shadow-[4px_4px_0_rgba(112,55,77,0.18)]"
			>
				<div
					class="relative overflow-hidden {isAndroid
						? 'rounded-[0.45rem]'
						: 'rounded-[0.85rem]'} bg-cream"
				>
					{#key currentMobile.id}
						<img
							src={currentMobile.src}
							alt={currentMobile.alt}
							width="553"
							height={currentMobile.height}
							class="block w-full animate-in fade-in duration-200"
							loading="eager"
							decoding="async"
						/>
					{/key}
					{#if isAndroid}
						<span
							class="absolute left-1/2 top-[5px] z-10 size-[5px] -translate-x-1/2 rounded-full bg-[#2b2226] ring-1 ring-plum/30"
							aria-hidden="true"
						></span>
					{/if}
				</div>
			</div>
			</div>

			<figcaption
				class="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-plum/45"
			>
				macOS · Linux · Windows · iOS · Android · tvOS
			</figcaption>
		</figure>
	</div>
</PageSection>
