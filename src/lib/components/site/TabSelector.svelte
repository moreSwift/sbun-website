<script lang="ts">
	import type { Component } from 'svelte';
	import { TabsList, TabsTrigger } from '$lib/components/ui/tabs';

	let {
		items,
		label,
		large = false
	}: {
		items: { id: string; name: string; meta: string; icon: Component }[];
		label: string;
		large?: boolean;
	} = $props();
</script>

<TabsList
	aria-label={label}
	class="grid h-auto w-full grid-cols-2 gap-1 border border-plum/20 bg-paper/55 p-1 sm:grid-cols-3"
>
	{#each items as item}
		{@const Icon = item.icon}
		<TabsTrigger
			value={item.id}
			class="h-auto min-w-0 justify-start whitespace-normal! px-2.5 py-2 text-[13px] text-plum hover:bg-plum/5 data-active:border-plum/25 data-active:bg-plum/10 data-active:text-plum data-active:hover:border-plum/30 data-active:hover:bg-plum/15 data-active:hover:text-plum"
		>
			<Icon class="{large ? 'size-6' : 'size-4'} mr-1 shrink-0" weight="fill" />
			<span class="flex min-w-0 flex-col items-start">
				<span
					class="min-w-0 whitespace-normal! font-display font-semibold {large
						? 'text-[16px]'
						: 'text-[12px]'}">{item.name}</span
				>
				<span
					class="min-w-0 whitespace-normal! {large
						? 'text-[13px]'
						: 'text-[10px]'}">{item.meta}</span
				>
			</span>
		</TabsTrigger>
	{/each}
</TabsList>
