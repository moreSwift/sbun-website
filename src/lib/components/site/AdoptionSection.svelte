<script lang="ts">
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
	import FileCode from 'phosphor-svelte/lib/FileCode';
	import Package from 'phosphor-svelte/lib/Package';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import type { Component } from 'svelte';
	import type { CodeLanguage } from '$lib/highlight';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import CodeBlock from './CodeBlock.svelte';
	import CopyButton from './CopyButton.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';

	const approaches: {
		number: string;
		title: string;
		body: string;
		code: string;
		language: CodeLanguage;
		icon: Component;
		label: string;
		href: string;
		link: string;
		experimental?: boolean;
	}[] = [
		{
			number: '01',
			title: 'Start with a template',
			body: 'Create a new package from a built-in SwiftUI or SwiftCrossUI template, or a custom template of your own.',
			code: 'sbun create HelloWorld --template SwiftCrossUI',
			language: 'shell',
			icon: Package,
			label: 'Create',
			href: 'https://docs.swiftbundler.dev/documentation/swift-bundler/package-templates',
			link: 'Explore templates'
		},
		{
			number: '02',
			title: 'Add Bundler.toml',
			body: 'Already have a SwiftPM package? Drop in one config file, describe the app, and keep every existing target where it is.',
			code: 'config_version = "3.1.0"\n\n[apps.HelloWorld]\nidentifier = "com.example.HelloWorld"\nproduct = "HelloWorld"\nversion = "1.0.0"',
			language: 'toml',
			icon: FileCode,
			label: 'Configure',
			href: 'https://docs.swiftbundler.dev/documentation/swift-bundler/configuration',
			link: 'Configuration guide'
		},
		{
			number: '03',
			title: 'Convert an xcodeproj',
			body: 'Generate a SwiftPM-based project from an existing Xcode project.',
			code: 'sbun convert <file.xcodeproj> --out <output-directory>',
			language: 'shell',
			icon: ArrowsClockwise,
			label: 'Convert',
			href: 'https://docs.swiftbundler.dev/documentation/swift-bundler/migrating-to-swift-bundler',
			link: 'Migration guide',
			experimental: true
		}
	];
</script>

<PageSection id="adoption">
	<SectionHeading
		index="02"
		eyebrow="ADOPTION"
		title="Adopt Swift Bundler at any stage."
		intro="Starting from scratch? Use a template to get a head start. Already have an app? Add a Bundler.toml config and start shipping to more platforms."
	/>

	<div class="mt-8 flex items-center gap-3">
		<span class="label-type text-rose-deep">Three adoption methods</span>
		<Separator class="h-px flex-1 bg-plum/20" />
	</div>

	<div class="mt-4 grid gap-3 lg:grid-cols-3">
		{#each approaches as approach}
			{@const Icon = approach.icon}
			<SiteCard
				class="flex h-full flex-col"
			>
				<CardHeader class="flex flex-row items-center justify-between gap-3 px-5 pb-0 pt-5">
					<div class="flex items-center gap-2">
						<Badge variant="site" size="default" class="font-mono">Method {approach.number}</Badge>
						<Badge variant="ghost" size="default" class="px-0 font-mono">
							<Icon class="size-4" />
							{approach.label}
						</Badge>
					</div>
					{#if approach.experimental}
						<Badge variant="warning" size="default" class="gap-1 font-mono">
							<WarningCircle class="size-3" weight="fill" />
							Experimental
						</Badge>
					{/if}
				</CardHeader>

				<CardContent class="flex flex-col px-5 pb-5 pt-3">
					<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
						{approach.title}
					</h3>
					<p class="mt-1 text-[13px] leading-relaxed text-plum/85">{approach.body}</p>
					<div class="mt-4 overflow-hidden border border-plum/15 bg-cream/50">
						<div class="flex items-center justify-between border-b border-plum/15 px-3 py-2">
							<span class="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-plum/55">
								{#if approach.language === 'toml'}
									<FileCode class="size-3" />
									Bundler.toml
								{:else}
									<Terminal class="size-3" />
									Command
								{/if}
							</span>
							<CopyButton
								value={approach.code}
								label="Copy {approach.language === 'toml' ? 'Bundler.toml' : 'command'}"
								class="text-plum hover:bg-peach"
							/>
						</div>
						<CodeBlock code={approach.code} language={approach.language} tone="light" size="sm" wrap />
					</div>
					{#if approach.experimental}
						<div
							class="mt-5 flex items-start gap-2 border border-warning/30 bg-warning-tint px-3 py-2 text-[11px] leading-relaxed text-warning"
						>
							<WarningCircle class="mt-0.5 size-3.5 shrink-0" weight="fill" />
							<p>
								<b>Experimental.</b> Converted projects may require manual intervention before they
								properly build.
							</p>
						</div>
					{/if}
				</CardContent>

				<CardFooter class="mt-auto border-0 p-0">
					<div class="flex w-full items-center justify-between px-5 py-3">
						<a
							href={approach.href}
							class="label-type group inline-flex items-center gap-1 text-rose-deep hover:text-plum"
						>
							{approach.link}
							<ArrowUpRight
								class="size-3"
							/>
						</a>
						<span class="label-type {approach.experimental ? 'text-warning' : 'text-plum/35'}"
							>{approach.experimental ? 'Manual follow-up' : 'Recommended'}</span
						>
					</div>
				</CardFooter>
			</SiteCard>
		{/each}
	</div>
</PageSection>
