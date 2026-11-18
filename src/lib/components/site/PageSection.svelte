<script lang="ts">
	import type { Snippet } from 'svelte';
	import DotGrid from './DotGrid.svelte';

	let {
		id,
		grid = false,
		gridClass = 'opacity-40',
		class: className = '',
		children
	}: {
		id: string;
		grid?: boolean;
		gridClass?: string;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<section
	id={id}
	class="relative border-b border-plum/15 py-16 sm:py-20 {className}"
>
	{#if grid}
		<DotGrid class={gridClass} />
	{/if}
	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		{@render children?.()}
	</div>
</section>
