<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import { refreshBuildCommit } from '$lib/commit';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(refreshBuildCommit);
</script>

<svelte:head>
	<title>Swift Bundler — Ship Swift anywhere.</title>
</svelte:head>

{@render children()}
