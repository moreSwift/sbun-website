<script lang="ts">
	import Bug from 'phosphor-svelte/lib/Bug';
	import Devices from 'phosphor-svelte/lib/Devices';
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Stack from 'phosphor-svelte/lib/Stack';
	import Wrench from 'phosphor-svelte/lib/Wrench';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import CodeBlock from './CodeBlock.svelte';
	import HotReloadDemo from './HotReloadDemo.svelte';
	import IconTile from './IconTile.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import { features } from '$lib/content';

	const icons = [Lightning, Stack, ShieldCheck, Devices, Wrench, Bug];

	const stats = [
		{ value: '+3', label: 'new platforms' },
		{ value: '7', label: 'bundlers' },
		{ value: '1', label: 'config file' },
		{ value: '0', label: 'xcodeproj files' }
	];

	const hotStats = [
		{ value: 'TCP', label: 'transport' },
		{ value: '0', label: 'relaunches' },
		{ value: '2', label: 'platforms' }
	];

	const overlaySnippet = `# defaults for every destination
[apps.HelloWorld]
product = "HelloWorld"
[[apps.HelloWorld.overlays]]
condition = "platform(linux)"
dbus_activatable = true
url_schemes = ["hello"]
[[apps.HelloWorld.overlays]]
condition = "bundler(linuxRPM)"
requirements = ["gtk3"]`;
</script>

<PageSection id="whats-new">
		<SectionHeading
			index="03"
			eyebrow="What’s new in 3.0"
			title="The release that goes everywhere."
			intro="Windows, Linux and Android are first-class destinations now. Hot reload, generated installers and a config format that scales with the app are along for the ride."
		/>

		<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each stats as stat}
				<SiteCard variant="muted" class="py-4">
					<CardContent class="flex flex-col items-center px-4 text-center">
						<span class="font-display text-2xl font-bold tracking-tight text-plum sm:text-3xl"
							>{stat.value}</span
						>
						<span class="label-type mt-1 text-plum/45">{stat.label}</span>
					</CardContent>
				</SiteCard>
			{/each}
		</div>

		<div class="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
			<!-- Hot reload -->
			<SiteCard variant="muted" class="flex flex-col md:col-span-2">
				<CardHeader class="flex flex-row items-center gap-2 px-5 pb-0 pt-5">
					<IconTile>
						<Lightning class="size-4" weight="fill" />
					</IconTile>
					<Badge variant="ghost" size="xs" class="px-0 font-mono uppercase tracking-[0.14em] text-plum/45">
						{features[0].meta}
					</Badge>
				</CardHeader>
				<CardContent class="flex flex-1 flex-col px-5 pb-5 pt-4">
					<h3 class="font-display text-xl font-semibold tracking-tight text-plum sm:text-2xl">
						{features[0].title}
					</h3>
					<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">{features[0].body}</p>
					<div class="mt-5">
						<HotReloadDemo />
					</div>
					<div
						class="mt-4 grid grid-cols-3 divide-x divide-plum/15 border-y border-plum/15 text-center"
					>
						{#each hotStats as stat}
							<div class="px-2 py-2">
								<p class="font-display text-sm font-semibold text-plum">{stat.value}</p>
								<p class="label-type mt-0.5 text-plum/45">{stat.label}</p>
							</div>
						{/each}
					</div>
					<p class="mt-3 text-[11px] leading-relaxed text-plum/70">
						The dylib is swapped in place; the running process keeps its memory.
					</p>
				</CardContent>
				<CardFooter
					class="mt-auto justify-between border-t border-plum/15 px-5 py-3 font-mono text-[9px] text-plum/45"
				>
					<span>sbun run --hot</span>
					<span class="hidden sm:inline">TCP dylib swap · state preserved</span>
				</CardFooter>
			</SiteCard>

			<!-- Overlays -->
			<SiteCard variant="muted" class="flex flex-col md:col-span-2">
				<CardHeader class="flex flex-row items-center gap-2 px-5 pb-0 pt-5">
					<IconTile>
						<Stack class="size-4" />
					</IconTile>
					<Badge variant="ghost" size="xs" class="px-0 font-mono uppercase tracking-[0.14em] text-plum/45">
						{features[1].meta}
					</Badge>
				</CardHeader>
				<CardContent class="flex flex-1 flex-col px-5 pb-5 pt-4">
					<h3 class="font-display text-xl font-semibold tracking-tight text-plum sm:text-2xl">
						{features[1].title}
					</h3>
					<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">{features[1].body}</p>

					<SiteCard variant="dark" class="mt-5 overflow-hidden">
						<CardHeader
							class="flex flex-row items-center justify-between border-b border-cream/15 px-3 py-2"
						>
							<span class="font-mono text-[10px] text-cream/70">Bundler.toml</span>
							<span class="flex gap-1">
								{#each ['macOS', 'Linux', 'Windows', 'Android'] as platform}
									<Badge
										variant="ghost"
										size="xs"
										class="border border-cream/15 px-1.5 font-mono text-[8px] text-cream/60"
									>
										{platform}
									</Badge>
								{/each}
							</span>
						</CardHeader>
						<CardContent class="p-0">
							<CodeBlock code={overlaySnippet} language="toml" />
						</CardContent>
					</SiteCard>
				</CardContent>
				<CardFooter class="mt-auto border-t border-plum/15 px-5 py-3">
					<p class="font-mono text-[9px] text-plum/45">
						One schema · platform and bundler conditions
					</p>
				</CardFooter>
			</SiteCard>

			{#each features.slice(2) as feature, index}
				{@const Icon = icons[index + 2]}
				<SiteCard
					variant="muted"
					class="group flex flex-col transition-colors hover:border-plum/40 hover:bg-paper"
				>
					<CardHeader class="flex flex-row items-start justify-between gap-2 px-5 pb-0 pt-5">
						<IconTile>
							<Icon class="size-4" />
						</IconTile>
						<Badge
							variant="ghost"
							size="xs"
							class="px-0 text-right font-mono uppercase tracking-[0.12em] text-plum/45"
						>
							{feature.meta}
						</Badge>
					</CardHeader>
					<CardContent class="px-5 pb-5 pt-4">
						<h3 class="font-display text-[17px] font-semibold tracking-tight text-plum">
							{feature.title}
						</h3>
						<p class="mt-2 text-[12.5px] leading-relaxed text-plum/85">{feature.body}</p>
					</CardContent>
				</SiteCard>
			{/each}
		</div>

		<SiteCard variant="faint" class="mt-4">
			<CardContent class="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-[13px] text-plum/85">
					Plus: string catalogs, asset catalogs, entitlements, Metal shaders, Icon Composer
					files, custom builders, experimental Xcode project conversion and a generated JSON
					schema.
				</p>
				<a
					href="/documentation/swift-bundler/migrating-to-swift-bundler"
					class="label-type shrink-0 text-rose-deep hover:text-plum"
				>
					Read the v2 → v3 guide
				</a>
			</CardContent>
		</SiteCard>
</PageSection>
