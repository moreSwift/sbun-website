<script lang="ts">
	import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import Plus from 'phosphor-svelte/lib/Plus';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import CodeBlock from './CodeBlock.svelte';

	const labels = ['Crates packed', 'Shipments sent', 'Boxes sealed'];

	let count = $state(3);
	let appLabel = $state(labels[0]);
	let draftIndex = $state(0);
	let status = $state<'idle' | 'saving' | 'reloaded'>('idle');

	const snippet = $derived(`Text("${labels[draftIndex]}: \\(count)")
  .font(.title)
  .tabularNumbers()`);

	function cycleDraft() {
		draftIndex = (draftIndex + 1) % labels.length;
	}

	function save() {
		status = 'saving';
		setTimeout(() => {
			appLabel = labels[draftIndex];
			status = 'reloaded';
			setTimeout(() => {
				if (status === 'reloaded') status = 'idle';
			}, 2400);
		}, 650);
	}
</script>

<div class="grid overflow-hidden border border-plum/20 sm:grid-cols-[1.2fr_0.8fr]">
	<!-- editor -->
	<div class="flex flex-col bg-plum text-cream">
		<div class="flex items-center justify-between border-b border-cream/15 px-3 py-2">
			<span class="font-mono text-[10px] text-cream/75">ContentView.swift</span>
			<Badge
				variant="ghost"
				size="xs"
				class="px-0 font-mono text-[8px] uppercase tracking-[0.16em] text-cream/45"
			>
				live
			</Badge>
		</div>
		<div class="min-h-0 flex-1">
			<CodeBlock code={snippet} language="swift" size="sm" wrap padded={false} class="py-3" />
		</div>
		<div class="border-t border-cream/15 p-3">
			<Button
				variant="outline"
				size="sm"
				onclick={cycleDraft}
				class="h-auto w-full rounded-none border-cream/20 bg-transparent py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-cream/70 hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
			>
				Next label →
			</Button>
			<Button
				onclick={save}
				disabled={status === 'saving'}
				class="mt-2 h-auto w-full gap-1.5 rounded-none bg-rose py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-cream hover:bg-rose/90"
			>
				<ArrowsClockwise class="size-3.5 {status === 'saving' ? 'animate-spin' : ''}" />
				{status === 'saving' ? 'Swapping dylib…' : 'Save & hot reload'}
			</Button>
		</div>
	</div>

	<!-- app preview -->
	<div class="flex flex-col bg-cream">
		<div class="flex items-center gap-2 border-b border-plum/15 px-3 py-2">
			<span class="flex gap-1" aria-hidden="true">
				<span class="size-2 rounded-full border border-plum/25"></span>
				<span class="size-2 rounded-full border border-plum/25"></span>
			</span>
			<span class="font-mono text-[9px] text-plum/45">HelloWorld.app</span>
			<Badge variant="site" size="xs" class="ml-auto gap-1 border-plum/20 bg-transparent font-mono">
				<span class="size-1.5 rounded-full bg-rose"></span>
				running
			</Badge>
		</div>

		<div class="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center">
			<p class="font-mono text-[9px] uppercase tracking-[0.16em] text-plum/45">{appLabel}</p>
			<p class="mt-1 font-display text-4xl font-bold tabular-nums tracking-tight text-plum">
				{count}
			</p>
			<Button
				variant="outline"
				size="sm"
				onclick={() => count++}
				class="mt-3 h-auto gap-1 rounded-none border-plum/25 bg-paper px-2.5 py-1 font-mono text-[9px] text-plum hover:border-plum/50 hover:bg-peach/60"
			>
				<Plus class="size-3" weight="bold" /> Pack one
			</Button>
		</div>

		<div class="min-h-8 border-t border-plum/15 px-3 py-2">
			{#if status === 'saving'}
				<p class="flex items-center gap-1.5 font-mono text-[8.5px] text-plum/70">
					<ArrowsClockwise class="size-3 animate-spin" /> Replacing the dylib…
				</p>
			{:else if status === 'reloaded'}
				<p class="flex items-center gap-1.5 font-mono text-[8.5px] text-rose-deep">
					<CheckCircle class="size-3" weight="fill" /> Reloaded in 38 ms · state preserved
				</p>
			{:else}
				<p class="flex items-center gap-1.5 font-mono text-[8.5px] text-plum/45">
					<Lightning class="size-3" /> Edit, save, keep the counter.
				</p>
			{/if}
		</div>
	</div>
</div>
