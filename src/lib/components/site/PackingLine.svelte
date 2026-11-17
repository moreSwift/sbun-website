<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import BoxArrowUp from 'phosphor-svelte/lib/BoxArrowUp';
	import FileCode from 'phosphor-svelte/lib/FileCode';
	import Package from 'phosphor-svelte/lib/Package';
	import Play from 'phosphor-svelte/lib/Play';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import CodeBlock from './CodeBlock.svelte';
	import Logo from './Logo.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import PageSection from './PageSection.svelte';

	const steps = [
		{
			number: '01',
			title: 'Keep your package',
			body: 'Your Package.swift and existing targets stay exactly where they are. SwiftPM remains the source of truth.',
			code: '.executableTarget(name: "HelloWorld")',
			language: 'swift',
			icon: Package,
			label: 'SwiftPM'
		},
		{
			number: '02',
			title: 'Describe the shipment',
			body: 'Add one git-friendly TOML file: identifier, product, version, icon. Overlays handle the platform-specific bits.',
			code: '[apps.HelloWorld]\nproduct = "HelloWorld"',
			language: 'toml',
			icon: FileCode,
			label: 'Bundler.toml'
		},
		{
			number: '03',
			title: 'Build and run',
			body: 'Run on your Mac, an Apple simulator, an Android emulator or a connected device. Hot reload keeps your state.',
			code: 'sbun run --hot',
			language: 'shell',
			icon: Play,
			label: 'Run'
		},
		{
			number: '04',
			title: 'Seal the crate',
			body: 'Produce an .app, .msi, .AppImage, .rpm, .apk or a plain bundle. Sign it, strip it, ship it.',
			code: 'sbun bundle -c release',
			language: 'shell',
			icon: BoxArrowUp,
			label: 'Bundle'
		}
	] as const;
</script>

<PageSection id="how-it-works">
		<SectionHeading
			index="01"
			eyebrow="The packing line"
			title="From package to parcel in four steps."
			intro="Swift Bundler is a layer over Swift Package Manager, not a replacement. The setup is one TOML file; the output is a crate you can actually hand to someone."
		/>

		<div class="relative mt-12">
			<!-- conveyor rail -->
			<div class="relative mb-5 hidden h-8 items-center sm:flex" aria-hidden="true">
				<div class="absolute inset-x-0 top-1/2 border-t border-dashed border-plum/25"></div>
				<div class="absolute left-0 top-1/2 -translate-y-1/2 bg-cream pr-2">
					<span class="label-type text-plum/45">Inbound</span>
				</div>
				<div class="absolute right-0 top-1/2 -translate-y-1/2 bg-cream pl-2">
					<span class="label-type text-plum/45">Outbound</span>
				</div>
				<div class="animate-crate absolute top-1/2 -translate-y-1/2">
					<Logo size={22} />
				</div>
			</div>

			<ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each steps as step, index}
					{@const Icon = step.icon}
					<li class="group relative">
						<SiteCard
							class="h-full bg-paper/55 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-plum/40 group-hover:bg-paper group-hover:shadow-[3px_3px_0_rgba(112,55,77,0.12)]"
						>
							<CardHeader
								class="flex flex-row items-start justify-between gap-3 px-5 pb-0 pt-5"
							>
								<Badge
									variant="site"
									size="xs"
									class="font-mono text-[10px] font-semibold tracking-[0.18em]"
								>
									{step.number}
								</Badge>
								<span class="flex items-center gap-1.5 text-plum/45">
									<Icon class="size-4" />
									<Badge
										variant="ghost"
										size="xs"
										class="px-0 font-mono text-[8px] uppercase tracking-[0.16em] text-plum/45"
									>
										{step.label}
									</Badge>
								</span>
							</CardHeader>

							<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-7">
								<h3 class="font-display text-[17px] font-semibold tracking-tight text-plum">
									{step.title}
								</h3>
								<p class="mt-2 flex-1 text-[13px] leading-relaxed text-plum/85">{step.body}</p>
							</CardContent>

							<CardFooter class="mt-0 border-t border-plum/15 p-0">
								<CodeBlock
									code={step.code}
									language={step.language}
									tone="light"
									wrap
									size="sm"
								/>
							</CardFooter>
						</SiteCard>

						{#if index < steps.length - 1}
							<span
								class="absolute -right-[15px] top-1/2 z-10 hidden size-7 -translate-y-1/2 items-center justify-center border border-plum/20 bg-cream text-plum/55 lg:flex"
								aria-hidden="true"
							>
								<ArrowRight class="size-3" />
							</span>
						{/if}
					</li>
				{/each}
			</ol>
		</div>

		<SiteCard variant="accent" class="mt-8">
			<CardContent class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-[13px] leading-relaxed text-plum/85">
					<span class="font-semibold text-plum">Already have an app?</span>
					Drop in a Bundler.toml. If you are on v2, <code
						class="font-mono text-[12px] text-rose-deep">sbun config migrate</code
					> rewrites it and keeps a .orig backup.
				</p>
				<a
					href="/documentation/swift-bundler/configuration"
					class="label-type group inline-flex shrink-0 items-center gap-1 text-rose-deep hover:text-plum"
				>
					Configuration docs
					<ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
				</a>
			</CardContent>
		</SiteCard>
</PageSection>
