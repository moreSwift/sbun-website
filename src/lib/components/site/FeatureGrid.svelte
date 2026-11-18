<script lang="ts">
	import Stack from 'phosphor-svelte/lib/Stack';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardHeader } from '$lib/components/ui/card';
	import CodeBlock from './CodeBlock.svelte';
	import IconTile from './IconTile.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import { features } from '$lib/content';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	const overlaySnippet = `config_version = "3.1.0"

[apps.HelloWorld]
product = "HelloWorld"
identifier = "com.example.HelloWorld"
version = "3.0.0"
plist.NSHighResolutionCapable = true

[[apps.HelloWorld.overlays]]
condition = "platform(iOS)"
plist.UISupportedInterfaceOrientations = [
	"UIInterfaceOrientationPortrait"
]`;
</script>

<PageSection id="whats-new">
	<SectionHeading
		index="03"
		eyebrow="What’s new in 3.0"
		title="3.0 brings your apps everywhere."
		intro="Windows, Linux, iOS and Android are now first-class destinations. This release also brings hot reloading, a rich overlay-based config system, and much much more."
	/>

	<div class="mt-8 grid gap-3 lg:grid-cols-4">
		<!-- Config overlays -->
		<SiteCard variant="muted" class="flex flex-col lg:col-span-2">
			<CardHeader class="flex flex-row items-center gap-3 px-5 pb-0 pt-5">
				{@const Icon = features[0].icon}
				<IconTile>
					<Icon class="size-4" />
				</IconTile>
				<h3 class="font-display text-[17px] font-semibold tracking-tight text-plum">
					Config overlays
				</h3>
			</CardHeader>
			<CardContent class="px-5 pb-5 pt-2">
				<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">
					Use platform- or bundler-specific
					overlays to configure conditional behaviour.
				</p>

				<SiteCard variant="dark" class="mt-4 overflow-hidden">
					<div
						class="flex items-center justify-between gap-3 border-b border-cream/15 px-4 py-2.5"
					>
						<span class="font-mono text-[10px] text-cream/70">Bundler.toml</span>
						<span class="flex gap-1">
							{#each ['macOS', 'Linux', 'Windows', 'tvOS', 'iOS', 'Android'] as platform}
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
			{#each features.slice(1) as feature}
				{@const Icon = feature.icon}
				<SiteCard
					variant="muted"
					class="group flex h-full flex-col transition-colors"
				>
					<CardHeader class="flex flex-row items-center gap-3 px-5 pb-0 pt-5">
						<IconTile>
							<Icon class="size-4" />
						</IconTile>
						<h3 class="font-display text-[17px] font-semibold tracking-tight text-plum">
							{feature.title}
						</h3>
					</CardHeader>
					<CardContent class="px-5 pb-5 pt-2">
						<p class="mt-2 text-[13px] leading-relaxed text-plum/85">{feature.body}</p>
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
				href="https://github.com/moreSwift/swift-bundler/releases/tag/v3.0.0"
				class="label-type shrink-0 text-rose-deep items-center hover:text-plum flex gap-1"
				target="_blank"
			>
				Read the release notes
				<ArrowUpRight class="size-3" />
			</a>
		</CardContent>
	</SiteCard>
</PageSection>
