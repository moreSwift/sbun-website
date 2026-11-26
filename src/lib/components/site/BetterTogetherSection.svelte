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
</script>

<PageSection id="better-together">
	<div class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-12 pb-4">
		<div class="min-w-0">
			<h2
				class="max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-4xl md:text-[2.9rem]"
			>
				Better together
			</h2>
			<h3 class="text-2xl sm:text-3xl mt-2">
SwiftCrossUI + Swift Bundler
			</h3>

			<p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
				If you’re targeting seven platforms with Swift, there’s really only one option, and that’s SwiftCrossUI + Swift Bundler.
			</p>

			<p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
				SwiftCrossUI gives you a unified, SwiftUI-style API for building native apps.
				Swift Bundler handles the platform-specific details that make those apps real:
				custom URL schemes, mobile permissions, signing and installers.
			</p>

			<div
				class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center text-[13px]"
			>
				<Button
					href={swiftCrossUiQuickStartUrl}
					size="lg"
					class="h-11 gap-2 rounded-none bg-plum px-5 text-[13px] font-semibold text-cream hover:bg-plum/90"
				>
					Try together
					<ArrowUpRight class="size-4" aria-hidden="true" />
				</Button>
				<Button
					href={swiftCrossUiUrl}
					variant="outline"
					target="_blank"
					rel="noreferrer"
					class="h-11 gap-2 border-plum/30 bg-transparent px-5 text-[13px] font-semibold text-plum hover:bg-paper"
				>
					Explore SwiftCrossUI
					<ArrowUpRight class="size-4" aria-hidden="true" />
				</Button>
			</div>
		</div>

		<figure class="min-w-0">
			<div class="relative pl-3 sm:pl-4 sm:top-4">
				<div
					class="bg-paper/60 p-2 shadow-[6px_6px_0_rgba(112,55,77,0.10)]"
				>
					<div class="flex items-center justify-between gap-2">
						<Tabs bind:value={selectedDesktop} class="gap-0">
							<TabsList
								aria-label="Desktop platform"
								class="h-auto gap-0 border border-plum/20 bg-paper/55 p-0.5"
							>
								{#each desktopPreviews as preview}
									<TabsTrigger
										value={preview.id}
										class="h-auto px-2.5 py-1 text-[13px] text-plum hover:bg-plum/5 data-active:border-plum/25 data-active:bg-plum/10 data-active:text-plum data-active:hover:border-plum/30 data-active:hover:bg-plum/15 data-active:hover:text-plum"
									>
										{preview.label}
									</TabsTrigger>
								{/each}
							</TabsList>
						</Tabs>

						<div class="text-[13px]">
							<span class="font-medium">MusicPlayerExample</span> (<a class="underline" href="https://github.com/moreSwift/swift-cross-ui/tree/main/Examples/Sources/MusicPlayerExample">src</a>)
						</div>

						<Tabs bind:value={selectedMobile} class="gap-0">
							<TabsList
								aria-label="Mobile platform"
								class="h-auto gap-0 border border-plum/20 bg-paper/55 p-0.5"
							>
								{#each mobilePreviews as preview}
									<TabsTrigger
										value={preview.id}
										class="h-auto px-2.5 py-1 text-[13px] text-plum hover:bg-plum/5 data-active:border-plum/25 data-active:bg-plum/10 data-active:text-plum data-active:hover:border-plum/30 data-active:hover:bg-plum/15 data-active:hover:text-plum"
									>
										{preview.label}
									</TabsTrigger>
								{/each}
							</TabsList>
						</Tabs>
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
					class="absolute -bottom-5 left-0 z-10 w-[27%] max-w-[7.5rem] rotate-[-3deg] {isAndroid
						? 'rounded-[0.65rem]'
						: 'rounded-[1.15rem]'} border-[2px] border-black bg-plum p-[3px] shadow-[4px_4px_0_rgba(112,55,77,0.18)]"
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
		</figure>
	</div>
</PageSection>
