<script lang="ts">
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import CodeBlock from './CodeBlock.svelte';
	import CopyButton from './CopyButton.svelte';

	let {
		command,
		copyLabel = 'Copy command',
		class: className = ''
	}: { command: string; copyLabel?: string; class?: string } = $props();

	const multiline = $derived(command.includes('\n'));
</script>

<div
	class="flex min-w-0 {multiline ? 'items-start' : 'items-center'} gap-2 border border-plum/20 bg-paper/70 bg-clip-border px-3 py-1.5 backdrop-blur-sm {className}"
>
	<Terminal class="size-3.5 shrink-0 text-rose-deep {multiline ? 'mt-0.5' : ''}" aria-hidden="true" />
	<div class="min-w-0 flex-1">
		<CodeBlock code={command} language="shell" tone="light" size="md" inline wrap />
	</div>
	<CopyButton
		value={command}
		label={copyLabel}
		class="ml-auto shrink-0 text-plum hover:bg-peach {multiline ? 'mt-0.5' : ''}"
	/>
</div>
