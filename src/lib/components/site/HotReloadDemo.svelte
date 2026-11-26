<script lang="ts">
	import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import Plus from 'phosphor-svelte/lib/Plus';

	const labels = ['Crates packed', 'Shipments sent', 'Boxes sealed'];

	let count = $state(3);
	let appLabel = $state(labels[0]);
	let draftIndex = $state(0);
	let status = $state<'idle' | 'saving' | 'reloaded'>('idle');

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

<div
	class="grid overflow-hidden border border-plum/20 sm:grid-cols-[1.05fr_0.95fr]"
>
	<!-- editor -->
	<div class="flex flex-col bg-plum text-cream">
		<div class="flex items-center justify-between border-b border-cream/15 px-3 py-2">
			<span class="font-mono text-[10px] text-cream/75">ContentView.swift</span>
			<span class="label-type text-cream/35">live</span>
		</div>
		<pre
			class="flex-1 overflow-x-auto px-3 py-3 font-mono text-[10px] leading-[1.7] text-cream/80 sm:text-[10.5px]"><span
				class="text-rose">Text</span>(<span class="text-peach">"{labels[draftIndex]}: \(count)"</span>)
  .font(.title)
  .tabularNumbers()</pre>
		<div class="border-t border-cream/15 p-3">
			<button
				onclick={cycleDraft}
				class="label-type w-full border border-cream/20 px-2 py-1.5 text-cream/75 transition-colors hover:border-cream/40 hover:text-cream"
			>
				Next label →
			</button>
			<button
				onclick={save}
				disabled={status === 'saving'}
				class="mt-2 flex w-full items-center justify-center gap-1.5 bg-rose px-2 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-rose/90 disabled:opacity-60"
			>
				<ArrowsClockwise class="size-3.5 {status === 'saving' ? 'animate-spin' : ''}" />
				{status === 'saving' ? 'Swapping dylib…' : 'Save & hot reload'}
			</button>
		</div>
	</div>

	<!-- app preview -->
	<div class="flex flex-col bg-cream">
		<div class="flex items-center gap-2 border-b border-plum/15 px-3 py-2">
			<span class="flex gap-1" aria-hidden="true">
				<span class="size-2 rounded-full border border-plum/25"></span>
				<span class="size-2 rounded-full border border-plum/25"></span>
			</span>
			<span class="font-mono text-[9px] text-muted-foreground">HelloWorld.app</span>
			<span class="ml-auto flex items-center gap-1 font-mono text-[8px] text-plum/35">
				<span class="size-1.5 rounded-full bg-rose"></span>
				running
			</span>
		</div>

		<div class="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center">
			<p class="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{appLabel}</p>
			<p class="mt-1 font-display text-4xl font-bold tabular-nums tracking-tight text-plum">
				{count}
			</p>
			<button
				onclick={() => count++}
				class="mt-3 inline-flex items-center gap-1 border border-plum/25 bg-paper px-2.5 py-1 font-mono text-[9px] text-plum transition-colors hover:border-plum/50 hover:bg-peach/60"
			>
				<Plus class="size-3" weight="bold" /> Pack one
			</button>
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
				<p class="flex items-center gap-1.5 font-mono text-[8.5px] text-plum/40">
					<Lightning class="size-3" /> Edit, save, keep the counter.
				</p>
			{/if}
		</div>
	</div>
</div>
