<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Info from 'phosphor-svelte/lib/Info';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import type { Component } from 'svelte';
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
	import CommandLine from './CommandLine.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import TabSelector from './TabSelector.svelte';
	import { bundlers } from '$lib/content';

	const icons: Record<string, Component> = {
		darwinApp: AppleLogo,
		linuxGeneric: LinuxLogo,
		linuxAppImage: LinuxLogo,
		linuxRPM: LinuxLogo,
		windowsGeneric: WindowsLogo,
		windowsMSI: WindowsLogo,
		androidAPK: AndroidLogo
	};

	const bundlerTabs = bundlers.map((bundler) => ({
		id: bundler.id,
		name: bundler.label,
		meta: bundler.pickerPlatforms,
		icon: icons[bundler.id]
	}));

	const maxSnippetLines = Math.max(...bundlers.map((bundler) => bundler.snippet.length));

	let active = $state('darwinApp');
</script>

{#snippet compareBundlers()}
	<a
		href="/documentation/swift-bundler/bundlers"
		class="label-type group inline-flex shrink-0 items-center gap-1 pb-1 text-rose-deep hover:text-plum"
	>
		Compare bundlers
		<ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
	</a>
{/snippet}

<PageSection id="bundlers" grid gridClass="opacity-30">
		<SectionHeading
			index="01"
			eyebrow="CONFIGURATION"
			title="One config. Seven bundlers."
			intro="Swift Bundler picks the right output format and platform conventions from the same Bundler.toml. Choose a bundler to see what gets packed."
			action={compareBundlers}
		/>

		<Tabs bind:value={active} class="mt-10 gap-0">
			<TabSelector items={bundlerTabs} label="Choose a bundler" large />

			{#each bundlers as bundler}
				<TabsContent value={bundler.id} class="mt-4 focus-visible:outline-none">
					<div class="grid gap-4 lg:min-h-[33.4rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
						<!-- Config file -->
						<SiteCard variant="dark">
							<CardHeader
								class="flex flex-row items-center justify-between gap-3 border-b border-cream/15 px-4 py-3"
							>
								<span class="font-mono text-[11px] font-medium text-cream">Bundler.toml</span>
								<Badge
									variant="ghost"
									size="xs"
									class="border border-cream/20 px-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cream/70"
								>
									config 3.1.0
								</Badge>
							</CardHeader>

							<CardContent class="p-0">
								<CodeBlock
									code={bundler.snippet.map((line) => line.text).join('\n')}
									language="toml"
									lineNumbers
									padded={false}
									minLines={maxSnippetLines}
									accentLines={bundler.snippet.flatMap((line, index) =>
										line.accent ? [index + 1] : []
									)}
								/>
							</CardContent>

							<CardFooter class="mt-auto border-t border-cream/15 px-4 py-3">
								<div class="flex items-start gap-2">
									<Info class="mt-0.5 size-3.5 shrink-0 text-peach/80" />
									<p class="text-[11px] leading-relaxed text-cream/70">{bundler.note}</p>
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
										{bundler.label}
									</h3>
								</div>
								<div class="min-w-0 text-right">
									<p class="label-type text-plum/45">Destination</p>
									<p class="mt-1 max-w-[14rem] font-mono text-[10px] leading-relaxed text-plum/85">
										{bundler.platforms}
									</p>
								</div>
							</CardHeader>

							<CardContent class="p-0">
								<p class="border-b border-plum/15 px-5 py-3 text-[13px] leading-relaxed text-plum/85">
									{bundler.blurb}
								</p>
								<Table class="table-fixed text-[10px]">
									<TableBody>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-baseline text-[10px] uppercase leading-none tracking-[0.14em] text-plum/45"
											>
												Bundler
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-baseline font-mono text-[10px] text-plum/85">
												{bundler.name}
											</TableCell>
										</TableRow>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-baseline text-[10px] uppercase leading-none tracking-[0.14em] text-plum/45"
											>
												Output
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-baseline font-mono text-[10px] font-semibold text-plum">
												{bundler.output}
											</TableCell>
										</TableRow>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.2rem] whitespace-normal py-1.5 pl-5 pr-0 align-baseline text-[10px] uppercase leading-none tracking-[0.14em] text-plum/45"
											>
												Signing
											</TableCell>
											<TableCell class="whitespace-normal break-words py-1.5 pl-3 pr-5 align-baseline font-mono text-[10px] text-plum/85">
												{bundler.signing}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>

							<Separator class="bg-plum/15" />

							<CardContent class="px-5 py-4">
								<p class="label-type text-plum/45">Packed by the bundler</p>
								<CheckList items={bundler.handles} class="mt-2.5" />
							</CardContent>

							<Separator class="bg-plum/15" />

							<CardFooter class="mt-auto flex-col items-stretch gap-0 border-0 p-0">
								<div class="px-5 py-4">
									<div class="flex items-center justify-between gap-2">
										<p class="label-type text-plum/45">Command</p>
										<div class="flex flex-wrap justify-end gap-1">
											{#each bundler.formats as format}
												<Badge variant="site" size="xs" class="font-mono">{format}</Badge>
											{/each}
										</div>
									</div>
									<CommandLine command={bundler.command} class="mt-2" />
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
