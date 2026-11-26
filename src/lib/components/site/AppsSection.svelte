<script lang="ts">
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import SectionHeading from './SectionHeading.svelte';
	import { apps, githubUrl } from '$lib/content';
</script>

<section id="apps" class="border-b border-plum/15 bg-paper/35 py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<SectionHeading
			index="04"
			eyebrow="In the wild"
			title="Crates that left the warehouse."
			intro="Games, filmmaking tools, visualisers and utilities. These are real apps, built with Swift Package Manager and packed with Swift Bundler."
		/>

		<div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each apps as app, index}
				<a
					href={app.href}
					target="_blank"
					rel="noreferrer"
					class="group flex flex-col border border-plum/20 bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-plum/45 hover:shadow-[4px_4px_0_rgba(112,55,77,0.13)]"
				>
					<div class="flex items-center justify-between gap-3">
						<span class="label-type text-plum/35"
							>Receipt / {String(index + 1).padStart(3, '0')}</span
						>
						<span class="flex gap-1">
							{#each app.platforms as platform}
								<span
									class="border border-plum/20 bg-cream px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-plum/75"
									>{platform}</span
								>
							{/each}
						</span>
					</div>

					<h3
						class="mt-6 font-display text-xl font-semibold tracking-tight text-plum transition-colors group-hover:text-rose-deep"
					>
						{app.name}
					</h3>
					<p class="mt-2 flex-1 text-[13px] leading-relaxed text-plum/85">{app.description}</p>

					<div class="mt-5 flex items-center justify-between border-t border-dashed border-plum/25 pt-3">
						<span class="label-type text-plum/35">Delivered</span>
						<span class="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-rose-deep">
							Visit app
							<ArrowUpRight class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</span>
					</div>
				</a>
			{/each}
		</div>

		<div
			class="mt-4 flex flex-col items-start gap-3 border border-dashed border-plum/30 bg-cream/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="text-[13px] leading-relaxed text-plum/85">
				<span class="font-semibold text-plum">Built something with Swift Bundler?</span>
				Add it to the manifest — we like seeing the crates arrive.
			</p>
			<a
				href="{githubUrl}/issues/new"
				target="_blank"
				rel="noreferrer"
				class="inline-flex shrink-0 items-center gap-1.5 border border-plum/25 bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-plum transition-colors hover:bg-peach"
			>
				<GithubLogo class="size-3.5" />
				Submit your app
			</a>
		</div>
	</div>
</section>
