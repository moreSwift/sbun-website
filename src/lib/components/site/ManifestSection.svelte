<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Info from 'phosphor-svelte/lib/Info';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Table,
		TableBody,
		TableCell,
		TableRow
	} from '$lib/components/ui/table';
	import { Tabs, TabsContent } from '$lib/components/ui/tabs';
	import CheckList from './CheckList.svelte';
	import CodeBlock from './CodeBlock.svelte';
	import CopyButton from './CopyButton.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import TabSelector from './TabSelector.svelte';
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

	const destinations = platforms.map((platform) => ({
		id: platform.id,
		name: platform.name,
		meta: subtitles[platform.id],
		icon: icons[platform.id]
	}));

	const maxSnippetLines = Math.max(...platforms.map((platform) => platform.snippet.length));

	let active = $state('apple');
</script>

<PageSection id="platforms" tone="peach" grid gridClass="opacity-30">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<SectionHeading
				class="lg:flex-1"
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
			<TabSelector items={destinations} label="Choose a destination" />

			{#each platforms as platform}
				<TabsContent value={platform.id} class="mt-4 focus-visible:outline-none">
					<div class="grid gap-4 lg:min-h-[33.4rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
						<!-- Config file -->
						<SiteCard variant="dark">
							<CardHeader
								class="flex flex-row items-center justify-between gap-3 border-b border-cream/15 px-4 py-3"
							>
								<div class="flex items-center gap-2">
									<span class="flex gap-1" aria-hidden="true">
										<span class="size-2 bg-rose"></span>
										<span class="size-2 bg-peach"></span>
										<span class="size-2 bg-blue"></span>
									</span>
									<span class="font-mono text-[11px] font-medium text-cream">Bundler.toml</span>
								</div>
								<Badge
									variant="ghost"
									size="xs"
									class="border border-cream/20 px-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-cream/70"
								>
									format v2
								</Badge>
							</CardHeader>

							<CardContent class="p-0">
								<CodeBlock
									code={platform.snippet.map((line) => line.text).join('\n')}
									language="toml"
									lineNumbers
									padded={false}
									minLines={maxSnippetLines}
									accentLines={platform.snippet.flatMap((line, index) =>
										line.accent ? [index + 1] : []
									)}
								/>
							</CardContent>

							<CardFooter class="mt-auto border-t border-cream/15 px-4 py-3">
								<div class="flex items-start gap-2">
									<Info class="mt-0.5 size-3.5 shrink-0 text-peach/80" />
									<p class="text-[11px] leading-relaxed text-cream/70">{platform.note}</p>
								</div>
							</CardFooter>
						</SiteCard>

						<!-- Packing slip -->
						<SiteCard>
							<CardHeader
								class="flex flex-row items-start justify-between gap-4 border-b border-plum/20 px-5 py-4"
							>
								<div class="shrink-0">
									<p class="label-type text-rose-deep">Packing slip</p>
									<h3 class="mt-1.5 font-display text-xl font-semibold tracking-tight text-plum">
										{platform.name}
									</h3>
								</div>
								<div class="min-w-0 text-right">
									<p class="label-type text-plum/45">Destination</p>
									<p class="mt-1 max-w-[14rem] font-mono text-[9px] leading-relaxed text-plum/85">
										{platform.destination}
									</p>
								</div>
							</CardHeader>

							<CardContent class="p-0">
								<Table class="table-fixed text-[10px]">
									<TableBody>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-top text-[8px] uppercase leading-none tracking-[0.16em] text-plum/45"
											>
												Bundler
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-top font-mono text-[10px] text-plum/85">
												{platform.bundlers}
											</TableCell>
										</TableRow>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-top text-[8px] uppercase leading-none tracking-[0.16em] text-plum/45"
											>
												Output
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-top font-mono text-[10px] font-semibold text-plum">
												{platform.output}
											</TableCell>
										</TableRow>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-top text-[8px] uppercase leading-none tracking-[0.16em] text-plum/45"
											>
												Signing
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-top font-mono text-[10px] text-plum/85">
												{platform.signing}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>

							<Separator class="bg-plum/15" />

							<CardContent class="px-5 py-4">
								<p class="label-type text-plum/45">Packed by the bundler</p>
								<CheckList items={platform.handles} class="mt-2.5" />
							</CardContent>

							<Separator class="bg-plum/15" />

							<CardFooter class="mt-auto flex-col items-stretch gap-0 border-0 p-0">
								<div class="px-5 py-4">
									<div class="flex items-center justify-between gap-2">
										<p class="label-type text-plum/45">Command</p>
										<div class="flex flex-wrap justify-end gap-1">
											{#each platform.formats as format}
												<Badge variant="site" size="xs" class="font-mono">{format}</Badge>
											{/each}
										</div>
									</div>
									<div
										class="mt-2 flex items-center gap-2 border border-plum/20 bg-cream/60 px-2.5 py-2"
									>
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
							</CardFooter>
						</SiteCard>
					</div>
				</TabsContent>
			{/each}
		</Tabs>

		<p class="mt-4 font-mono text-[10px] leading-relaxed text-plum/45">
			Bundlers: darwinApp · linuxGeneric · linuxAppImage · linuxRPM · windowsGeneric ·
			windowsMSI · androidAPK
		</p>
</PageSection>
