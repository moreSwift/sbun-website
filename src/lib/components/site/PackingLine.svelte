<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import BoxArrowUp from 'phosphor-svelte/lib/BoxArrowUp';
	import FileCode from 'phosphor-svelte/lib/FileCode';
	import Package from 'phosphor-svelte/lib/Package';
	import Play from 'phosphor-svelte/lib/Play';
	import Logo from './Logo.svelte';
	import SectionHeading from './SectionHeading.svelte';

	const steps = [
		{
			number: '01',
			title: 'Keep your package',
			body: 'Your Package.swift and existing targets stay exactly where they are. SwiftPM remains the source of truth.',
			code: '.executableTarget(name: "HelloWorld")',
			icon: Package,
			label: 'SwiftPM'
		},
		{
			number: '02',
			title: 'Describe the shipment',
			body: 'Add one git-friendly TOML file: identifier, product, version, icon. Overlays handle the platform-specific bits.',
			code: '[apps.HelloWorld]\nproduct = "HelloWorld"',
			icon: FileCode,
			label: 'Bundler.toml'
		},
		{
			number: '03',
			title: 'Build and run',
			body: 'Run on your Mac, an Apple simulator, an Android emulator or a connected device. Hot reload keeps your state.',
			code: 'sbun run --hot',
			icon: Play,
			label: 'Run'
		},
		{
			number: '04',
			title: 'Seal the crate',
			body: 'Produce an .app, .msi, .AppImage, .rpm, .apk or a plain bundle. Sign it, strip it, ship it.',
			code: 'sbun bundle -c release',
			icon: BoxArrowUp,
			label: 'Bundle'
		}
	];
</script>

<section id="how-it-works" class="relative border-b border-plum/15 py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<SectionHeading
			index="01"
			eyebrow="The packing line"
			title="From package to parcel in four steps."
			intro="Swift Bundler is a layer over Swift Package Manager, not a replacement. The setup is one TOML file; the output is a crate you can actually hand to someone."
		/>

		<div class="relative mt-12">
			<!-- conveyor rail -->
			<div class="relative mb-5 hidden h-8 items-center sm:flex" aria-hidden="true">
				<div class="cut-line absolute inset-x-0 top-1/2"></div>
				<div class="absolute left-0 top-1/2 -translate-y-1/2 bg-cream pr-2">
					<span class="label-type text-plum/35">Inbound</span>
				</div>
				<div class="absolute right-0 top-1/2 -translate-y-1/2 bg-cream pl-2">
					<span class="label-type text-plum/35">Outbound</span>
				</div>
				<div class="animate-crate absolute top-1/2 -translate-y-1/2">
					<Logo size={22} />
				</div>
			</div>

			<ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each steps as step, index}
					<li
						class="group relative flex flex-col border border-plum/20 bg-paper/55 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-plum/40 hover:bg-paper hover:shadow-[3px_3px_0_rgba(112,55,77,0.12)]"
					>
						<div class="flex items-start justify-between">
							<span
								class="font-mono text-[10px] font-semibold tracking-[0.18em] text-rose-deep"
							>
								{step.number}
							</span>
							<span class="flex items-center gap-1.5 text-plum/40">
								<step.icon class="size-4" />
								<span class="label-type">{step.label}</span>
							</span>
						</div>

						<h3 class="mt-7 font-display text-[17px] font-semibold tracking-tight text-plum">
							{step.title}
						</h3>
						<p class="mt-2 flex-1 text-[13px] leading-relaxed text-plum/85">{step.body}</p>

						<pre
							class="mt-5 overflow-x-auto border-t border-plum/15 pt-3 font-mono text-[10.5px] leading-relaxed text-plum/85"><code>{step.code}</code></pre>

						{#if index < steps.length - 1}
							<span
								class="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center border border-plum/20 bg-cream text-plum/65 lg:flex"
								aria-hidden="true"
							>
								<ArrowRight class="size-3" />
							</span>
						{/if}
					</li>
				{/each}
			</ol>
		</div>

		<div
			class="mt-8 flex flex-col gap-3 border-l-2 border-rose bg-paper/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="text-[13px] leading-relaxed text-plum/85">
				<span class="font-semibold text-plum">Already have an app?</span>
				Drop in a Bundler.toml. If you are on v2, <code class="font-mono text-[12px] text-rose-deep"
					>sbun config migrate</code
				> rewrites it and keeps a .orig backup.
			</p>
			<a
				href="/documentation/swift-bundler/configuration"
				class="label-type group inline-flex shrink-0 items-center gap-1 text-rose-deep hover:text-plum"
			>
				Configuration docs
				<ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>
	</div>
</section>
