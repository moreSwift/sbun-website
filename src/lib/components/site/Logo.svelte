<script lang="ts">
	let { size = 40, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<img
	src="/logo-transparent.png"
	alt=""
	width={size}
	height={size}
	class="shrink-0 {className}"
	style="image-rendering: pixelated"
	aria-hidden="true"
/>
