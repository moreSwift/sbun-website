<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<div
	class="pointer-events-none absolute inset-0 {className}"
	style="background-image: radial-gradient(color-mix(in srgb, var(--plum) 13%, transparent) 1px, transparent 1px); background-size: 18px 18px;"
	aria-hidden="true"
></div>
