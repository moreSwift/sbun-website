<script lang="ts">
	let {
		height = 32,
		light = false,
		class: className = ''
	}: { height?: number; light?: boolean; class?: string } = $props();
</script>

<div
	class="relative w-full overflow-hidden {className}"
	style="height: {height}px"
	aria-hidden="true"
>
	<div
		class="absolute inset-0 opacity-20"
		style="background-image: repeating-linear-gradient(90deg, {light
			? '#ffe2ca'
			: '#70374d'} 0 2px, transparent 2px 6px);"
	></div>
	<div
		class="animate-barcode-scan absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-rose/70 to-transparent"
	></div>
</div>
