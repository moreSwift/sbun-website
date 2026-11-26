<script lang="ts">
	import AndroidLogo from 'phosphor-svelte/lib/AndroidLogo';
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import DeviceMobile from 'phosphor-svelte/lib/DeviceMobile';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import Television from 'phosphor-svelte/lib/Television';
	import VirtualReality from 'phosphor-svelte/lib/VirtualReality';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';

	const platforms = [
		{ name: 'macOS', icon: AppleLogo },
		{ name: 'iOS', icon: DeviceMobile },
		{ name: 'tvOS', icon: Television },
		{ name: 'visionOS', icon: VirtualReality },
		{ name: 'Linux', icon: LinuxLogo },
		{ name: 'Windows', icon: WindowsLogo },
		{ name: 'Android', icon: AndroidLogo }
	];
</script>

<div class="border-y border-plum/15 bg-paper/50">
	<div
		class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6"
	>
		<span class="label-type shrink-0 text-muted-foreground">Ships to</span>
		{#each platforms as platform}
			<span class="flex items-center gap-2 text-plum/85">
				<platform.icon class="size-4" weight="fill" />
				<span class="font-mono text-[11px] font-medium">{platform.name}</span>
			</span>
		{/each}
		<span class="label-type ml-auto hidden text-plum/40 md:inline">+ Mac Catalyst</span>
	</div>
</div>
