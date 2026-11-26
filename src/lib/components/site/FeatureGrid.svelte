<script lang="ts">
	import Bug from 'phosphor-svelte/lib/Bug';
	import Devices from 'phosphor-svelte/lib/Devices';
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Stack from 'phosphor-svelte/lib/Stack';
	import Wrench from 'phosphor-svelte/lib/Wrench';
	import HotReloadDemo from './HotReloadDemo.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { features } from '$lib/content';

	const icons = [Lightning, Stack, ShieldCheck, Devices, Wrench, Bug];

	const stats = [
		{ value: '+3', label: 'new platforms' },
		{ value: '7', label: 'bundlers' },
		{ value: '1', label: 'config file' },
		{ value: '0', label: 'xcodeproj files' }
	];
</script>

<section id="whats-new" class="border-b border-plum/15 py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<SectionHeading
			index="03"
			eyebrow="What’s new in 3.0"
			title="The release that goes everywhere."
			intro="Windows, Linux and Android are first-class destinations now. Hot reload, generated installers and a config format that scales with the app are along for the ride."
		/>

		<div class="mt-8 grid grid-cols-2 gap-px border border-plum/20 bg-plum/15 sm:grid-cols-4">
			{#each stats as stat}
				<div class="flex flex-col items-center bg-cream px-4 py-4 text-center">
					<span class="font-display text-2xl font-bold tracking-tight text-plum sm:text-3xl"
						>{stat.value}</span
					>
					<span class="label-type mt-1 text-muted-foreground">{stat.label}</span>
				</div>
			{/each}
		</div>

		<div class="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
			<!-- Hot reload -->
			<article
				class="flex flex-col border border-plum/20 bg-paper/60 p-5 md:col-span-2"
			>
				<div class="flex items-center gap-2">
					<span class="flex size-7 items-center justify-center border border-plum/20 bg-cream text-rose-deep">
						<Lightning class="size-4" weight="fill" />
					</span>
					<span class="label-type text-muted-foreground">{features[0].meta}</span>
				</div>
				<h3 class="mt-4 font-display text-xl font-semibold tracking-tight text-plum sm:text-2xl">
					{features[0].title}
				</h3>
				<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">{features[0].body}</p>
				<div class="mt-5">
					<HotReloadDemo />
				</div>
				<div class="mt-3 flex items-center justify-between border-t border-plum/15 pt-3 font-mono text-[9px] text-muted-foreground">
					<span>sbun run --hot</span>
					<span class="hidden sm:inline">TCP dylib swap · state preserved</span>
				</div>
			</article>

			<!-- Overlays -->
			<article class="flex flex-col border border-plum/20 bg-paper/60 p-5 md:col-span-2">
				<div class="flex items-center gap-2">
					<span class="flex size-7 items-center justify-center border border-plum/20 bg-cream text-rose-deep">
						<Stack class="size-4" />
					</span>
					<span class="label-type text-muted-foreground">{features[1].meta}</span>
				</div>
				<h3 class="mt-4 font-display text-xl font-semibold tracking-tight text-plum sm:text-2xl">
					{features[1].title}
				</h3>
				<p class="mt-2 max-w-xl text-[13px] leading-relaxed text-plum/85">{features[1].body}</p>

				<div class="mt-5 overflow-hidden border border-plum/20 bg-plum">
					<div class="flex items-center justify-between border-b border-cream/15 px-3 py-2">
						<span class="font-mono text-[10px] text-cream/75">Bundler.toml</span>
						<span class="flex gap-1">
							{#each ['macOS', 'Linux', 'Windows', 'Android'] as platform}
								<span
									class="border border-cream/15 px-1.5 py-0.5 font-mono text-[8px] text-cream/40"
									>{platform}</span
								>
							{/each}
						</span>
					</div>
					<pre
						class="overflow-x-auto px-4 py-3 font-mono text-[10px] leading-[1.8] text-cream/70 sm:text-[10.5px]"><span
							class="text-cream/35"># defaults for every destination</span>
<span class="text-cream">[apps.HelloWorld]</span>
product = "HelloWorld"
icon = "icon.png"
<span class="text-rose">[[apps.HelloWorld.overlays]]</span>
<span class="text-peach">condition = "platform(linux)"</span>
dbus_activatable = true
url_schemes = ["hello"]
<span class="text-rose">[[apps.HelloWorld.overlays]]</span>
<span class="text-peach">condition = "bundler(linuxRPM)"</span>
requirements = ["gtk3"]</pre>
				</div>
			</article>

				{#each features.slice(2) as feature, index}
				{@const Icon = icons[index + 2]}
				<article
					class="group flex flex-col border border-plum/20 bg-paper/60 p-5 transition-colors hover:border-plum/40 hover:bg-paper"
				>
					<div class="flex items-start justify-between">
						<span
							class="flex size-7 items-center justify-center border border-plum/20 bg-cream text-rose-deep"
						>
							<Icon class="size-4" />
						</span>
						<span class="label-type text-right text-plum/35">{feature.meta}</span>
					</div>
					<h3 class="mt-4 font-display text-[17px] font-semibold tracking-tight text-plum">
						{feature.title}
					</h3>
					<p class="mt-2 text-[12.5px] leading-relaxed text-plum/85">{feature.body}</p>
				</article>
			{/each}
		</div>

		<div class="mt-4 flex flex-col gap-2 border border-plum/20 bg-paper/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-[13px] text-plum/85">
				Plus: string catalogs, asset catalogs, entitlements, Metal shaders, Icon Composer
				files, custom builders, experimental Xcode project conversion and a generated JSON schema.
			</p>
			<a
				href="/documentation/swift-bundler/migrating-to-swift-bundler"
				class="label-type shrink-0 text-rose-deep hover:text-plum"
			>
				Read the v2 → v3 guide
			</a>
		</div>
	</div>
</section>
