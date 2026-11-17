<script lang="ts">
	import type { Snippet } from 'svelte';
	import DotGrid from './DotGrid.svelte';

	let {
		id,
		tone = 'cream',
		grid = false,
		gridClass = 'opacity-40',
		class: className = '',
		children
	}: {
		id: string;
		tone?: 'cream' | 'peach' | 'peachLight' | 'paper';
		grid?: boolean;
		gridClass?: string;
		class?: string;
		children?: Snippet;
	} = $props();

	const tones = {
		cream: '',
		peach: 'bg-peach/35',
		peachLight: 'bg-peach/25',
		paper: 'bg-paper/35'
	};
</script>

<section
	id={id}
	class="relative border-b border-plum/15 py-16 sm:py-20 {tones[tone]} {className}"
>
	{#if grid}
		<DotGrid class={gridClass} />
	{/if}
	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		{@render children?.()}
	</div>
</section>
