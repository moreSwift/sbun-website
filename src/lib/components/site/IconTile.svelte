<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

<span
	class="flex size-7 items-center justify-center border border-plum/20 bg-cream text-rose-deep {className}"
>
	{@render children?.()}
</span>
