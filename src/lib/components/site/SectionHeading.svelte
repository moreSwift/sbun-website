<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';

	let {
		index,
		eyebrow,
		title,
		intro = '',
		class: className = ''
	}: {
		index: string;
		eyebrow: string;
		title: string;
		intro?: string;
		class?: string;
	} = $props();
</script>

<header class="max-w-6xl {className}">
	<div class="flex items-center gap-3">
		<Badge
			variant="site"
			size="sm"
			class="min-w-8 justify-center px-1.5 font-mono text-[9px] tracking-[0.12em]"
		>
			{index}
		</Badge>
		<span class="label-type text-rose-deep">{eyebrow}</span>
		<Separator class="hidden h-px flex-1 bg-plum/20 sm:block" />
	</div>
	<h2
		class="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-4xl md:text-[2.9rem]"
	>
		{title}
	</h2>
	{#if intro}
		<p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum/85 sm:text-base">
			{intro}
		</p>
	{/if}
</header>
