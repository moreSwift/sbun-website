<script lang="ts">
	let {
		class: className = '',
		height = 34,
		light = false
	}: { class?: string; height?: number; light?: boolean } = $props();

	// A deterministic barcode, so server and client render the same bars.
	const bars = [
		2, 1, 3, 1, 1, 4, 1, 2, 1, 1, 3, 2, 1, 1, 2, 4, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 4, 1, 1, 3,
		2, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1
	];
</script>

<div
	class="flex items-stretch gap-[2px] {className}"
	style="height: {height}px"
	aria-hidden="true"
>
	{#each bars as width, index}
		<span
			class="block {light ? 'bg-cream' : 'bg-plum'}"
			style="width: {width}px; opacity: {index % 7 === 0 ? 0.55 : 1}"
		></span>
	{/each}
</div>
