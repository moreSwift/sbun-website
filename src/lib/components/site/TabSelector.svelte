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
	class="grid h-auto w-full grid-cols-2 gap-1 border border-plum/20 bg-paper/55 p-1 sm:grid-cols-4"
>
	{#each items as item}
		{@const Icon = item.icon}
		<TabsTrigger
			value={item.id}
			class="justify-start border border-transparent text-left text-plum hover:bg-tab-active/10 data-active:border-tab-active data-active:bg-tab-active data-active:hover:bg-tab-active/90 data-active:hover:text-primary-foreground {large
				? 'gap-3 px-4 py-3.5'
				: 'gap-2.5 px-3 py-2.5'}"
		>
			<Icon class="{large ? 'size-5' : 'size-4'} shrink-0" weight="fill" />
			<span class="flex flex-col items-start gap-0.5">
				<span class="font-display font-semibold {large ? 'text-[14px]' : 'text-[12px]'}"
					>{item.name}</span
				>
				<span
					class="font-mono tracking-[0.06em] {large
						? 'text-[10px]'
						: 'text-[9px]'}">{item.meta}</span
				>
			</span>
		</TabsTrigger>
	{/each}
</TabsList>
