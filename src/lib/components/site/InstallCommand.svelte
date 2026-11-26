<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import CommandLine from './CommandLine.svelte';

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
	<CommandLine command={selected.command} copyLabel="Copy install command" />

	<div class="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
		<Tabs bind:value={platform} class="gap-0">
			<TabsList
				aria-label="Choose install platform"
				class="h-auto gap-0 border border-plum/20 bg-paper/55 p-0.5"
			>
				{#each platforms as item}
					<TabsTrigger
						value={item.id}
						class="h-auto px-2.5 py-1 text-[13px] text-plum hover:bg-plum/5 data-active:border-plum/25 data-active:bg-plum/10 data-active:text-plum data-active:hover:border-plum/30 data-active:hover:bg-plum/15 data-active:hover:text-plum"
					>
						{item.name}
					</TabsTrigger>
				{/each}
			</TabsList>
		</Tabs>

		<a
			href={selected.script}
			target="_blank"
			rel="noreferrer"
			class="group inline-flex items-center gap-1 text-[14px] text-rose-deep hover:text-plum"
		>
			View install script
			<ArrowUpRight
				class="size-4"
			/>
		</a>
	</div>
</div>
