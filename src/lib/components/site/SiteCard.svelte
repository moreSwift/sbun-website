<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	let {
		variant = 'paper',
		class: className = '',
		children
	}: {
		variant?: 'paper' | 'muted' | 'faint' | 'dark' | 'dashed' | 'accent' | 'label';
		class?: string;
		children?: Snippet;
	} = $props();

	const variants = {
		paper: 'border border-plum/20 bg-paper',
		muted: 'border border-plum/20 bg-paper/60',
		faint: 'border border-plum/20 bg-paper/40',
		dark: 'border-2 border-code-border bg-code text-cream',
		dashed: 'border border-dashed border-plum/30 bg-cream/60',
		accent: 'border-0 border-l-2 border-rose bg-paper/50',
		label: 'border-2 border-plum bg-paper'
	};
</script>

<Card class={cn('gap-0 rounded-none bg-clip-border py-0 ring-0', variants[variant], className)}>
	{@render children?.()}
</Card>
