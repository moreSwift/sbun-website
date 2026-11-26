<script lang="ts">
	let {
		index,
		eyebrow,
		title,
		intro = ''
	}: { index: string; eyebrow: string; title: string; intro?: string } = $props();
</script>

<header class="mx-auto max-w-6xl">
	<div class="flex items-center gap-3">
		<span
			class="label-type inline-flex h-6 min-w-8 items-center justify-center border border-plum/30 bg-paper px-1.5 text-plum"
		>
			{index}
		</span>
		<span class="label-type text-rose-deep">{eyebrow}</span>
		<span class="cut-line hidden h-px flex-1 sm:block"></span>
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
