<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import Logo from './Logo.svelte';

	let {
		command,
		label = 'Terminal',
		note = '',
		class: className = ''
	}: { command: string; label?: string; note?: string; class?: string } = $props();
</script>

<figure class="relative w-full min-w-0 border-2 border-plum bg-plum text-cream {className}">
	<figcaption
		class="flex items-center justify-between border-b border-cream/20 px-3 py-2"
	>
		<span class="flex items-center gap-2">
			<span class="flex gap-1" aria-hidden="true">
				<span class="size-2 bg-rose"></span>
				<span class="size-2 bg-peach"></span>
				<span class="size-2 bg-blue"></span>
			</span>
			<span class="label-type text-cream/75">{label}</span>
		</span>
		<span class="flex items-center gap-2">
			<span class="hidden items-center gap-1.5 sm:flex">
				<Logo size={14} />
				<span class="label-type text-cream/55">SBUN</span>
			</span>
			<CopyButton value={command} label="Copy command" />
		</span>
	</figcaption>
	<div class="relative overflow-x-auto px-4 py-4">
		<pre class="whitespace-pre-wrap break-all font-mono text-[12px] leading-relaxed text-cream sm:text-[12.5px]"><span
				class="select-none text-rose"
				aria-hidden="true">$ </span><span class="text-cream">{command.split('\n')[0]}</span>{#if command.split('\n').length > 1}{#each command.split('\n').slice(1) as line}<span class="block pl-[1.1em]">{line}</span>{/each}{/if}</pre>
	</div>
	{#if note}
		<div class="border-t border-cream/15 px-4 py-2">
			<p class="label-type text-cream/70">{note}</p>
		</div>
	{/if}
</figure>
