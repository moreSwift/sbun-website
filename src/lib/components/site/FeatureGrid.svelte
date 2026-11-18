<script lang="ts">
	import Bug from 'phosphor-svelte/lib/Bug';
	import Devices from 'phosphor-svelte/lib/Devices';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Stack from 'phosphor-svelte/lib/Stack';
	import Wrench from 'phosphor-svelte/lib/Wrench';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardHeader } from '$lib/components/ui/card';
	import CodeBlock from './CodeBlock.svelte';
	import IconTile from './IconTile.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import { features } from '$lib/content';

	const icons = [ShieldCheck, Devices, Wrench, Bug];

	const overlaySnippet = `config_version = "3.1.0"

[apps.HelloWorld]
product = "HelloWorld"

[[apps.HelloWorld.overlays]]
condition = "platform(linux)"
dbus_activatable = true

[[apps.HelloWorld.overlays]]
condition = "bundler(linuxRPM)"
requirements = ["gtk3"]`;
</script>

<PageSection id="whats-new">
	<SectionHeading
		index="03"
		eyebrow="What’s new in 3.0"
		title="3.0 brings your apps everywhere"
		intro="Windows, Linux and Android are first-class destinations now. Generated installers and a config format that scales with the app are along for the ride."
	/>

	<div class="mt-8 grid gap-3 lg:grid-cols-4">
		<!-- Config overlays -->
		<SiteCard variant="muted" class="flex flex-col lg:col-span-2">
			<CardHeader class="flex flex-row items-center gap-2 px-5 pb-0 pt-5">
				<IconTile>
					<Stack class="size-4" />
				</IconTile>
				<Badge
					variant="ghost"
					size="xs"
					class="px-0 font-mono uppercase tracking-[0.14em] text-plum/45"
				>
					{features[1].meta}
				</Badge>
			</CardHeader>
			<CardContent class="px-5 pb-5 pt-4">
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum sm:text-2xl">
					Config overlays
				</h3>
				<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">
					Configure your app once, then add platform or bundler-specific overrides with
					overlays that get validated and merged recursively.
				</p>

				<SiteCard variant="dark" class="mt-5 overflow-hidden">
					<div
						class="flex items-center justify-between gap-3 border-b border-cream/15 px-4 py-2.5"
					>
						<span class="font-mono text-[10px] text-cream/70">Bundler.toml</span>
						<span class="flex gap-1">
							{#each ['macOS', 'Linux', 'Windows', 'Android'] as platform}
								<Badge
									variant="ghost"
									size="xs"
									class="border border-cream/15 px-1.5 font-mono text-[9px] text-cream/60"
								>
									{platform}
								</Badge>
							{/each}
						</span>
					</div>
					<CardContent class="p-0">
						<CodeBlock code={overlaySnippet} language="toml" />
					</CardContent>
				</SiteCard>
			</CardContent>
		</SiteCard>

		<!-- Four supporting features fill the space previously used by hot reload -->
		<div class="grid gap-3 sm:grid-cols-2 lg:col-span-2">
			{#each features.slice(2) as feature, index}
				{@const Icon = icons[index]}
				<SiteCard
					variant="muted"
					class="group flex h-full flex-col transition-colors hover:border-plum/40 hover:bg-paper"
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
