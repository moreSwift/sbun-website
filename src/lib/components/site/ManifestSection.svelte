<script lang="ts">
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Plugs from 'phosphor-svelte/lib/Plugs';
	import Sliders from 'phosphor-svelte/lib/Sliders';
	import Stack from 'phosphor-svelte/lib/Stack';
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
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import TabSelector from './TabSelector.svelte';
	import { configurationFeatures, type ConfigurationFeature } from '$lib/content';

	const icons: Record<ConfigurationFeature['id'], Component> = {
		'configure-once': Sliders,
		'conditional-overlays': Stack,
		'native-integrations': Plugs
	};

	const tabs = configurationFeatures.map((feature) => ({
		id: feature.id,
		name: feature.name,
		meta: feature.meta,
		icon: icons[feature.id]
	}));

	const maxSnippetLines = Math.max(
		...configurationFeatures.map((feature) => feature.snippet.length)
	);

	let active = $state(configurationFeatures[0].id);
</script>

<PageSection id="configuration" grid gridClass="opacity-30">
	<SectionHeading
		title="Powerful configuration."
		intro="Swift Bundler's powerful configuration format allows you to tailor your app to every platform without touching any platform-specific tools."
	/>

	<Tabs bind:value={active} class="mt-7 gap-0">
		<TabSelector items={tabs} label="Choose a configuration benefit" large />

		{#each configurationFeatures as feature}
			<TabsContent value={feature.id} class="mt-4 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-2 lg:items-stretch">
					<!-- Packing slip -->
					<SiteCard class="flex h-full flex-col">
						<CardHeader
							class="flex flex-row items-start justify-between gap-4 border-b border-plum/20 px-5 py-4"
						>
							<div class="min-w-0">
								<p class="label-type text-rose-deep">Packing slip</p>
								<h3 class="mt-1.5 font-display text-xl font-semibold tracking-tight text-plum">
									{feature.slipTitle}
								</h3>
							</div>
							<Badge variant="site" size="xs" class="shrink-0 font-mono">
								config 3.1.0
							</Badge>
						</CardHeader>

						<CardContent class="flex-1 p-0">
							<Table class="my-2 table-fixed text-[11px]">
								<TableBody>
									{#each feature.details as detail}
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.5rem] whitespace-normal py-1 pl-5 pr-0 align-baseline text-[10px] uppercase leading-none tracking-[0.14em] text-plum/65"
											>
												{detail.label}
											</TableCell>
											<TableCell
												class="whitespace-normal break-words py-1 pl-3 pr-5 align-baseline font-mono text-[11px] text-plum/85"
											>
												{detail.value}
											</TableCell>
										</TableRow>
									{/each}
								</TableBody>
							</Table>
							<p class="border-t border-plum/15 px-5 py-3 text-[13px] leading-relaxed text-plum/85">
								{feature.blurb}
							</p>
							<div class="border-t border-plum/15 px-5 py-3">
								<CheckList items={feature.capabilities} />
							</div>
						</CardContent>

						<Separator class="bg-plum/15" />

						<CardFooter
							class="mt-auto flex-row items-center justify-between gap-3 border-0 px-5 py-3"
						>
							<a
								href={feature.href}
								target="_blank"
								rel="noreferrer"
								class="label-type group inline-flex items-center gap-1 text-rose-deep hover:text-plum"
							>
								{feature.linkLabel}
								<ArrowUpRight class="size-3" />
							</a>
							<span
								class="font-mono text-[9px] uppercase tracking-[0.14em] text-plum/35"
							>
								{feature.slipNote}
							</span>
						</CardFooter>
					</SiteCard>

					<!-- Config file -->
					<SiteCard variant="dark" class="flex h-full flex-col">
						<CardHeader
							class="flex flex-row items-center justify-between gap-3 border-b border-cream/15 [--card-spacing:0.5rem]"
						>
							<span class="font-mono text-[13px] font-medium text-cream">Bundler.toml</span>
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
								code={feature.snippet.map((line) => line.text).join('\n')}
								language="toml"
								lineNumbers
								padded={false}
								minLines={maxSnippetLines}
								accentLines={feature.snippet.flatMap((line, index) =>
									line.accent ? [index + 1] : []
								)}
							/>
						</CardContent>
					</SiteCard>
				</div>
			</TabsContent>
		{/each}
	</Tabs>
</PageSection>
