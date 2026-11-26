<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import type { Snippet } from 'svelte';

	let {
		title,
		intro = '',
		class: className = '',
		action
	}: {
		title: string;
		intro?: string;
		class?: string;
		action?: Snippet;
	} = $props();
</script>

<header class="max-w-6xl {className}">
	<div class="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
		<div>
			<h2
				class="max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-4xl md:text-[2.9rem]"
			>
				{title}
			</h2>
			{#if intro}
				<p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
					{intro}
				</p>
			{/if}
		</div>
		{#if action}
			<div class="shrink-0">
				{@render action()}
			</div>
		{/if}
	</div>
</header>
