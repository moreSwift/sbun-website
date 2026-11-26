<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowRight';
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

	const tabs = [
		{
			id: "configure-once",
			name: "Configure once",
			meta: "Swift Bundler handles the rest",
			icon: icons["darwinApp"]
		},
		{
			id: "conditional-overlays",
			name: "Conditional overlays",
			meta: "Platform-specific config",
			icon: icons["darwinApp"]
		},
		{
			id: "asdf",
			name: "Conditional overlays",
			meta: "Platform-specific config",
			icon: icons["darwinApp"]
		},
	];

	const maxSnippetLines = Math.max(...bundlers.map((bundler) => bundler.snippet.length));

	let active = $state('darwinApp');
</script>

<PageSection id="bundlers" grid gridClass="opacity-30">
		<SectionHeading
			title="Powerful configuration."
			intro="Swift Bundler's powerful configuration format allows you to tailor your app to every platform without touching any platform-specific tools."
		/>

		<Tabs bind:value={active} class="mt-7 gap-0">
			<TabSelector items={tabs} label="Choose a benefit" large />

			{#each bundlers as bundler}
				<TabsContent value={bundler.id} class="mt-4 focus-visible:outline-none">
					<div class="grid gap-4 lg:min-h-[33.4rem] lg:grid-cols-[1fr_1fr] lg:items-stretch">
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
								<Table class="table-fixed text-[11px] my-2">
									<TableBody>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="w-[5.5rem] whitespace-normal py-0.5 pl-5 pr-0 align-baseline leading-none tracking-[0.14em] text-plum/65 uppercase"
											>
												Bundler
											</TableCell>
											<TableCell class="whitespace-normal break-words py-0.5 pl-3 pr-5 align-baseline font-mono text-plum/85">
												{bundler.name}
											</TableCell>
										</TableRow>
										<TableRow class="border-none hover:bg-transparent">
											<TableCell
												class="whitespace-normal py-0.5 pl-5 pr-0 align-baseline uppercase leading-none tracking-[0.14em] text-plum/65"
											>
												Signing
											</TableCell>
											<TableCell class="whitespace-normal break-words py-0.5 pl-3 pr-5 align-baseline font-mono text-plum/85">
												{bundler.signing}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
								<p class="border-t border-plum/15 px-5 py-3 text-[13px] leading-relaxed text-plum/85">
									{bundler.blurb}
								</p>
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

						<!-- Config file -->
						<SiteCard variant="dark">
							<CardHeader
								class="flex flex-row items-center [--card-spacing:0.5rem] justify-between gap-3 border-b border-cream/15"
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
						</SiteCard>
					</div>
				</TabsContent>
			{/each}
		</Tabs>
</PageSection>
