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
		'simple-by-default': Sliders,
		'deep-customization': Plugs,
		'conditional-overlays': Stack,
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
		intro="Swift Bundler's powerful configuration format lets you tailor your app to every platform while sharing basic configuration between platforms."
	/>

	<Tabs bind:value={active} class="mt-7 gap-0">
		<TabSelector items={tabs} label="Choose a configuration benefit" large />

		{#each configurationFeatures as feature}
			<TabsContent value={feature.id} class="mt-4 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-2 lg:items-stretch lg:grid-cols-[0.9fr_1.1fr]">
					<SiteCard class="flex h-full flex-col">
						<CardContent class="flex-1 pt-4">
							<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
								{feature.slipTitle}
							</h3>

							{#each feature.blurb as paragraph}
								<p class="pt-1 pb-1 text-[15px] leading-relaxed text-plum/85">
									{paragraph}
								</p>
							{/each}
						</CardContent>

						<Separator class="bg-plum/15" />

						<CardFooter
							class="mt-auto flex-row items-center justify-between gap-3 border-0 px-4 py-3"
						>
							<a
								href={feature.href}
								target="_blank"
								rel="noreferrer"
								class="group inline-flex text-[13px] items-center gap-1 text-rose-deep hover:text-plum"
							>
								{feature.linkLabel}
								<ArrowUpRight class="size-3" />
							</a>
						</CardFooter>
					</SiteCard>

					<!-- Config file -->
					<SiteCard variant="dark" class="flex h-full flex-col">
						<CardHeader
							class="flex flex-row items-center justify-between gap-3 border-b border-cream/15 [--card-spacing:0.5rem] px-4"
						>
							<span class="font-mono text-[13px] font-medium text-cream">Bundler.toml</span>
						</CardHeader>

						<CardContent class="p-0">
							<CodeBlock
								code={feature.snippet.map((line) => line.text).join('\n')}
								language="toml"
								lineNumbers
								padded={false}
								class="max-lg:min-h-0!"
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
