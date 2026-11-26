<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import type { Component } from 'svelte';
	import { bundlers } from '$lib/content';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';

	const icons: Record<string, Component> = {
		darwinApp: AppleLogo,
		linuxGeneric: LinuxLogo,
		linuxAppImage: LinuxLogo,
		linuxRPM: LinuxLogo,
		windowsGeneric: WindowsLogo,
		windowsMSI: WindowsLogo,
		androidAPK: AndroidLogo
	};
</script>

<PageSection id="bundlers">
	<SectionHeading
		title="Target common formats."
		intro="With one config file, Swift Bundler can produce a signed Apple bundle, a portable Linux directory, an AppImage, an RPM, a Windows installer or an Android APK."
	/>

	<div class="mt-8 border border-plum/20 bg-paper/60">
		<div
			class="hidden grid-cols-[1fr_1fr_1.5fr] gap-4 border-b border-plum/15 px-4 py-3 md:grid"
		>
			<span class="label-type text-plum/40">Bundler</span>
			<span class="label-type text-plum/40">Destinations</span>
			<span class="label-type text-plum/40">Signing</span>
		</div>

		{#each bundlers as bundler}
			{@const Icon = icons[bundler.id]}
			<div
				class="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-plum/15 px-4 py-4 transition-colors last:border-b-0 hover:bg-cream/30 md:grid-cols-[1fr_1fr_1.5fr] md:items-center md:gap-4"
			>
				<div class="col-span-2 flex items-center gap-4 md:col-span-1">
					<span
						class="grid size-8 shrink-0 place-items-center border border-plum/20 bg-cream text-rose-deep"
					>
						<Icon class="size-4" weight="fill" aria-hidden="true" />
					</span>
					<span class="min-w-0">
						<span class="block font-display text-[15px] font-semibold leading-tight text-plum">
							{bundler.name}
						</span>
						<span
							class="mt-0.5 block text-[12px
							] text-plum/45"
						>
							{bundler.label}
						</span>
					</span>
				</div>

				<div>
					<p class="label-type text-plum/35 md:hidden">Destination</p>
					<p class="mt-0.5 text-[15px] leading-relaxed text-plum/80">
						{bundler.platforms}
					</p>
				</div>

				<div class="col-span-2 md:col-span-1">
					<p class="label-type text-plum/35 md:hidden">Signing</p>
					<p
						class="mt-0.5 text-[15px] {bundler.signing.startsWith('Not supported')
							? 'text-plum/45'
							: 'text-plum/80'}"
					>
						{bundler.signing}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<a
		href="https://docs.swiftbundler.dev/documentation/swift-bundler/bundlers"
		target="_blank"
		rel="noreferrer"
		class="group inline-flex text-[14px] md:float-right shrink-0 items-center gap-1/2 pt-1 pr-1 text-rose-deep hover:text-plum"
	>
		Bundler reference
		<ArrowUpRight class="size-4" />
	</a>
</PageSection>
