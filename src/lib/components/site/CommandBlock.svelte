<script lang="ts">
	import { splitForWrap, tokenClass, tokenizeShell } from '$lib/highlight';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import CopyButton from './CopyButton.svelte';
	import Logo from './Logo.svelte';
	import SiteCard from './SiteCard.svelte';

	let {
		command,
		label = 'Terminal',
		note = '',
		class: className = ''
	}: { command: string; label?: string; note?: string; class?: string } = $props();
</script>

<SiteCard
	variant="dark"
	class="relative w-full min-w-0 shadow-[3px_3px_0_rgba(43,34,38,0.18)] {className}"
>
	<CardHeader
		class="flex flex-row items-center justify-between border-b border-cream/20 px-3 py-2"
	>
		<span class="label-type text-cream/70">{label}</span>
		<span class="flex items-center gap-2">
			<span class="hidden items-center gap-1.5 sm:flex">
				<Logo size={14} />
				<span class="label-type text-cream/45">SBUN</span>
			</span>
			<CopyButton value={command} label="Copy command" />
		</span>
	</CardHeader>
	<CardContent class="p-0">
		<pre
			class="grid grid-cols-[1.1em_minmax(0,1fr)] items-start gap-x-1.5 whitespace-pre-wrap px-4 py-4 font-mono text-[13.5px] leading-[1.8] text-cream sm:text-[14px]"><span
				class="select-none font-semibold text-rose"
				aria-hidden="true">$</span
			><span class="min-w-0"
				>{#each command.split('\n') as line}<span class="block"
						>{#each tokenizeShell(line) as token}{#if token.kind === 'space'}{token.text ||
								' '}{:else}<span class={tokenClass(token.kind, 'dark')}
									>{#each splitForWrap(token.text, token.kind) as chunk, chunkIndex}{#if chunkIndex > 0}<wbr />{/if}{chunk}{/each}</span
								>{/if}{/each}</span
					>{/each}</span
			></pre>
	</CardContent>
	{#if note}
		<CardFooter class="border-t border-cream/15 px-4 py-2">
			<p class="label-type leading-relaxed text-cream/70">{note}</p>
		</CardFooter>
	{/if}
</SiteCard>
