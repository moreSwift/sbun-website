<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Check from 'phosphor-svelte/lib/Check';
	import Info from 'phosphor-svelte/lib/Info';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger
	} from '$lib/components/ui/tabs';
	import CopyButton from './CopyButton.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { platforms } from '$lib/content';

	const icons = {
		apple: AppleLogo,
		linux: LinuxLogo,
		windows: WindowsLogo,
		android: AndroidLogo
	};

	const subtitles = {
		apple: 'macOS · iOS · tvOS',
		linux: 'AppImage · RPM',
		windows: 'MSI · portable',
		android: 'APK · emulator'
	};

	let active = $state('apple');
</script>

<section id="platforms" class="relative border-b border-plum/15 bg-peach/35 py-16 sm:py-20">
	<div class="dot-grid pointer-events-none absolute inset-0 opacity-30"></div>
	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<SectionHeading
				index="02"
				eyebrow="One manifest, every destination"
				title="The same crate. Seven different labels."
				intro="Swift Bundler picks the right bundler, output format and platform conventions from the same Bundler.toml. Choose a destination to see what gets packed."
			/>
			<a
				href="/documentation/swift-bundler/bundlers"
				class="label-type group inline-flex shrink-0 items-center gap-1 pb-1 text-rose-deep hover:text-plum"
			>
				Compare bundlers
				<ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<Tabs bind:value={active} class="mt-10 gap-0">
			<TabsList
				class="grid h-auto w-full grid-cols-2 gap-1 border border-plum/20 bg-paper/55 p-1 sm:grid-cols-4"
			>
				{#each platforms as platform}
					<TabsTrigger
						value={platform.id}
						class="h-full justify-start gap-2.5 border border-transparent px-3 py-2.5 text-left data-active:border-plum data-active:bg-plum data-active:text-cream"
					>
						{@const Icon = icons[platform.id]}
						<Icon class="size-4 shrink-0" weight="fill" />
						<span class="flex flex-col items-start gap-0.5">
							<span class="font-display text-[12px] font-semibold">{platform.name}</span>
							<span class="font-mono text-[8px] uppercase tracking-[0.08em] opacity-55"
								>{subtitles[platform.id]}</span
							>
						</span>
					</TabsTrigger>
				{/each}
			</TabsList>

			{#each platforms as platform}
				<TabsContent value={platform.id} class="mt-4 focus-visible:outline-none">
					<div class="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
						<!-- Config file -->
						<div class="flex flex-col border-2 border-plum bg-plum">
							<div class="flex items-center justify-between gap-3 border-b border-cream/15 px-4 py-3">
								<div class="flex items-center gap-2">
									<span class="flex gap-1" aria-hidden="true">
										<span class="size-2 bg-rose"></span>
										<span class="size-2 bg-peach"></span>
										<span class="size-2 bg-blue"></span>
									</span>
									<span class="font-mono text-[11px] font-medium text-cream">Bundler.toml</span>
								</div>
								<span
									class="border border-cream/20 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-cream/70"
								>
									format v2
								</span>
							</div>

							<div class="overflow-x-auto py-3">
								<pre class="min-w-max font-mono text-[11px] leading-[1.75] text-cream/85 sm:text-[11.5px]"
									>{#each platform.snippet as line, index}<span
											class="flex min-h-[1.75em] items-center border-l-2 {line.accent
												? 'border-rose bg-cream/[0.07]'
												: 'border-transparent'}"
											><span
												class="w-10 shrink-0 select-none pr-3 text-right text-[9px] text-cream/25"
												aria-hidden="true">{index + 1}</span
											><span class="whitespace-pre pr-5 {line.accent ? 'text-peach' : ''}"
												>{line.text || ' '}</span
											></span
										>{/each}</pre
								>
							</div>

							<div class="mt-auto flex items-start gap-2 border-t border-cream/15 px-4 py-3">
								<Info class="mt-0.5 size-3.5 shrink-0 text-peach/80" />
								<p class="text-[11px] leading-relaxed text-cream/75">{platform.note}</p>
							</div>
						</div>

						<!-- Packing slip -->
						<div class="flex flex-col border border-plum/20 bg-paper">
							<div class="flex items-start justify-between gap-4 border-b border-plum/20 px-5 py-4">
								<div>
									<p class="label-type text-rose-deep">Packing slip</p>
									<h3 class="mt-1.5 font-display text-xl font-semibold tracking-tight text-plum">
										{platform.name}
									</h3>
								</div>
								<div class="text-right">
									<p class="label-type text-plum/40">Destination</p>
									<p class="mt-1 max-w-[14rem] font-mono text-[9px] leading-relaxed text-plum/85">
										{platform.destination}
									</p>
								</div>
							</div>

							<dl class="grid grid-cols-[5.2rem_1fr] gap-y-3 px-5 py-4 font-mono text-[10px]">
								<dt class="label-type pt-0.5 text-plum/40">Bundler</dt>
								<dd class="break-words text-plum/85">{platform.bundlers}</dd>
								<dt class="label-type pt-0.5 text-plum/40">Output</dt>
								<dd class="break-all font-semibold text-plum">{platform.output}</dd>
								<dt class="label-type pt-0.5 text-plum/40">Signing</dt>
								<dd class="text-plum/85">{platform.signing}</dd>
							</dl>

							<div class="border-t border-dashed border-plum/25 px-5 py-4">
								<p class="label-type text-plum/40">Packed by the bundler</p>
								<ul class="mt-2.5 space-y-1.5">
									{#each platform.handles as item}
										<li class="flex items-start gap-2 text-[12px] leading-snug text-plum/85">
											<Check class="mt-0.5 size-3 shrink-0 text-rose-deep" weight="bold" />
											{item}
										</li>
									{/each}
								</ul>
							</div>

							<div class="mt-auto border-t border-plum/20 px-5 py-4">
								<div class="flex items-center justify-between gap-2">
									<p class="label-type text-plum/40">Command</p>
									<div class="flex flex-wrap justify-end gap-1">
										{#each platform.formats as format}
											<span
												class="border border-plum/20 bg-cream px-1.5 py-0.5 font-mono text-[8px] text-plum/80"
												>{format}</span
											>
										{/each}
									</div>
								</div>
								<div class="mt-2 flex items-center gap-2 border border-plum/20 bg-cream/60 px-2.5 py-2">
									<code class="min-w-0 flex-1 truncate font-mono text-[10px] text-plum/85"
										>{platform.command}</code
									>
									<CopyButton
										value={platform.command}
										label="Copy command"
										class="shrink-0 text-plum hover:bg-peach"
									/>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
			{/each}
		</Tabs>

		<p class="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
			Bundlers: darwinApp · linuxGeneric · linuxAppImage · linuxRPM · windowsGeneric ·
			windowsMSI · androidAPK
		</p>
	</div>
</section>
