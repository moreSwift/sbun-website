<script lang="ts">
	import Check from 'phosphor-svelte/lib/Check';

	let {
		items,
		size = 'sm',
		mono = false,
		columns = false,
		class: className = ''
	}: {
		items: string[];
		size?: 'sm' | 'xs';
		mono?: boolean;
		columns?: boolean;
		class?: string;
	} = $props();

	const textClass = $derived(
		size === 'sm'
			? 'items-start gap-2 text-[12px] leading-snug'
			: 'items-center gap-2 font-mono text-[10px] leading-snug'
	);
	const iconClass = $derived(size === 'sm' ? 'mt-0.5' : 'mt-0');
</script>

<ul class="{columns ? 'grid gap-1.5 sm:grid-cols-2' : 'space-y-1.5'} {className}">
	{#each items as item}
		<li class="flex {textClass} {mono ? 'font-mono' : ''} text-plum/85">
			<Check class="{iconClass} size-3 shrink-0 text-rose-deep" weight="bold" />
			{item}
		</li>
	{/each}
</ul>
