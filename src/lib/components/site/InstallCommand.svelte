<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import CodeBlock from './CodeBlock.svelte';
	import CopyButton from './CopyButton.svelte';

	type PlatformId = 'unix' | 'windows';

	const platforms: {
		id: PlatformId;
		name: string;
		command: string;
		script: string;
	}[] = [
		{
			id: 'unix',
			name: 'macOS / Linux',
			command: 'curl -fsSL https://sbun.dev/install.sh | sh',
			script: 'https://sbun.dev/install.sh'
		},
		{
			id: 'windows',
			name: 'Windows',
			command: 'powershell -c "irm sbun.dev/install.ps1|iex"',
			script: 'https://sbun.dev/install.ps1'
		}
	];

	let platform = $state<PlatformId>('unix');

	onMount(() => {
		const ua = navigator.userAgent.toLowerCase();
		if (ua.includes('windows')) platform = 'windows';
	});

	const selected = $derived(platforms.find((item) => item.id === platform) ?? platforms[0]);
</script>

<div class="mt-6 min-w-0 max-w-lg">
	<div
		class="flex min-w-0 items-center gap-2 border border-plum/20 bg-paper/70 bg-clip-border px-3 py-1.5 backdrop-blur-sm"
	>
		<Terminal class="size-3.5 shrink-0 text-rose-deep" aria-hidden="true" />
		<div class="min-w-0 flex-1">
			<CodeBlock
				code={selected.command}
				language="shell"
				tone="light"
				size="md"
				inline
				wrap
			/>
		</div>
		<CopyButton
			value={selected.command}
			label="Copy install command"
			class="ml-auto shrink-0 text-plum hover:bg-peach"
		/>
	</div>

	<div class="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
		<div class="flex items-center gap-2">
			<span class="label-type text-muted-foreground">Install for</span>
			<Tabs bind:value={platform} class="gap-0">
				<TabsList
					aria-label="Choose install platform"
					class="h-auto gap-0 border border-plum/20 bg-paper/55 p-0.5"
				>
					{#each platforms as item}
						<TabsTrigger
							value={item.id}
							class="h-auto px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em]"
						>
							{item.name}
						</TabsTrigger>
					{/each}
				</TabsList>
			</Tabs>
		</div>

		<a
			href={selected.script}
			target="_blank"
			rel="noreferrer"
			class="label-type group inline-flex items-center gap-1 text-rose-deep hover:text-plum"
		>
			View install script
			<ArrowUpRight
				class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
			/>
		</a>
	</div>
</div>
