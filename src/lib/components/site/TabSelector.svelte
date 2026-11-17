<script lang="ts">
	import type { Component } from 'svelte';
	import { TabsList, TabsTrigger } from '$lib/components/ui/tabs';

	let {
		items,
		label
	}: {
		items: { id: string; name: string; meta: string; icon: Component }[];
		label: string;
	} = $props();
</script>

<TabsList
	aria-label={label}
	class="grid h-auto w-full grid-cols-2 gap-1 border border-plum/20 bg-paper/55 p-1 sm:grid-cols-4"
>
	{#each items as item}
		{@const Icon = item.icon}
		<TabsTrigger
			value={item.id}
			class="justify-start gap-2.5 border border-transparent px-3 py-2.5 text-left data-active:border-plum"
		>
			<Icon class="size-4 shrink-0" weight="fill" />
			<span class="flex flex-col items-start gap-0.5">
				<span class="font-display text-[12px] font-semibold">{item.name}</span>
				<span class="font-mono text-[8px] uppercase tracking-[0.06em] opacity-55">{item.meta}</span>
			</span>
		</TabsTrigger>
	{/each}
</TabsList>
