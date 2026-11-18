<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Heart from 'phosphor-svelte/lib/Heart';
	import { Button } from '$lib/components/ui/button';
	import SiteCard from './SiteCard.svelte';
	import { openCollectiveUrl } from '$lib/content';
</script>

<SiteCard class="border-rose/40 bg-rose/10">
	<div class="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex items-center gap-3.5">
			<span
				class="grid size-10 shrink-0 place-items-center border border-rose/40 bg-rose/10 text-rose-deep"
			>
				<Heart class="size-[18px]" weight="fill" aria-hidden="true" />
			</span>
			<div class="max-w-2xl">
				<p class="label-type text-rose-deep">Support the work</p>
				<h2 class="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-plum">
					Help keep Swift Bundler moving.
				</h2>
				<p class="mt-2 text-[13px] leading-relaxed text-plum/85">
					Sponsorships fund maintenance, documentation, CI and new platform support. Every
					contribution goes back into the open-source tools.
				</p>
			</div>
		</div>

		<Button
			href={openCollectiveUrl}
			target="_blank"
			rel="noreferrer"
			class="h-11 shrink-0 gap-2 rounded-none bg-rose-deep px-5 text-[13px] font-semibold text-cream hover:bg-plum"
		>
			<Heart class="size-4" weight="fill" aria-hidden="true" />
			Sponsor on Open Collective
			<ArrowRight class="size-4" aria-hidden="true" />
		</Button>
	</div>
</SiteCard>
