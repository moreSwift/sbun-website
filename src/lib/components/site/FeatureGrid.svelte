<script lang="ts">
	import { CardContent, CardHeader } from '$lib/components/ui/card';
	import CodeBlock from './CodeBlock.svelte';
	import IconTile from './IconTile.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import { accent, features, plain } from '$lib/content';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	const overlaySnippetLines = [
		plain('config_version = "3.1.0"'),
		plain(""),
		plain("[apps.HelloWorld]"),
		plain('product = "HelloWorld"'),
		plain('identifier = "dev.example.HelloWorld"'),
		plain('version = "1.0.0"'),
		plain(""),
		plain("[[apps.HelloWorld.overlays]]"),
		accent('condition = "platform(macOS)"'),
		plain("plist.NSHighResolutionCapable = true"),
		plain(""),
		plain("[[apps.HelloWorld.overlays]]"),
		accent('condition = "platform(iOS)"'),
		plain("plist.UISupportedInterfaceOrientations = ["),
		plain('  "UIInterfaceOrientationPortrait"'),
		plain("]"),
	];
</script>

<PageSection id="whats-new">
	<SectionHeading
		title="3.0 supercharges your workflow."
		intro="This release brings hot reloading, a rich overlay-based config system, and support for Windows, Linux, iOS and Android as first-class destinations. "
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
					{features[0].title}
				</h3>
			</CardHeader>
			<CardContent class="px-5 pb-5 pt-2">
				<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">
					{features[0].body}
				</p>

				<SiteCard variant="dark" class="mt-4 overflow-hidden">
					<CardHeader
						class="flex flex-row items-center justify-between gap-3 border-b border-cream/15 [--card-spacing:0.5rem] px-4"
					>
						<span class="font-mono text-[13px] font-medium text-cream">Bundler.toml</span>
					</CardHeader>
					<CardContent class="p-0">
						<CodeBlock
							code={overlaySnippetLines.map((line) => line.text).join("\n")}
							accentLines={overlaySnippetLines.flatMap((line, index) =>
								line.accent ? [index + 1] : []
							)}
							language="toml"
							lineNumbers
							padded={false} />
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
				files, experimental Xcode project conversion, and advanced platform-specific configuration.
			</p>
			<a
				href="https://github.com/moreSwift/swift-bundler/releases/tag/v3.0.0"
				class="shrink-0 text-rose-deep items-center text-[13px] hover:text-plum flex gap-1"
				target="_blank"
			>
				Read the release notes
				<ArrowUpRight class="size-3" />
			</a>
		</CardContent>
	</SiteCard>
</PageSection>
