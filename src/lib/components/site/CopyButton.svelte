<script lang="ts">
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	import { Button } from '$lib/components/ui/button';

	let {
		value,
		label = 'Copy',
		class: className = ''
	}: { value: string; label?: string; class?: string } = $props();

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
		} catch {
			const textarea = document.createElement('textarea');
			textarea.value = value;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			textarea.remove();
		}
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}
</script>

<Button
	variant="ghost"
	size="icon-sm"
	class="text-current hover:bg-cream/10 hover:text-current {className}"
	aria-label={copied ? 'Copied' : label}
	title={copied ? 'Copied' : label}
	onclick={copy}
>
	{#if copied}
		<Check class="size-3.5" weight="bold" />
	{:else}
		<Copy class="size-3.5" />
	{/if}
</Button>
