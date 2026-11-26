<script lang="ts">
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Check from 'phosphor-svelte/lib/Check';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import CommandBlock from './CommandBlock.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { artifacts, githubUrl, installCommands, release } from '$lib/content';

	const targets = [
		{
			id: 'macos',
			name: 'macOS',
			format: '.pkg · universal',
			icon: AppleLogo
		},
		{
			id: 'linux',
			name: 'Linux',
			format: '.deb · .rpm · .tar.gz',
			icon: LinuxLogo
		},
		{
			id: 'windows',
			name: 'Windows',
			format: '.msi · .zip',
			icon: WindowsLogo
		},
		{
			id: 'source',
			name: 'Source',
			format: 'Swift 6',
			icon: GithubLogo
		}
	];

	let active = $state('macos');

	const included = [
		'swift-bundler plus the short sbun alias',
		'Shell completions for bash, zsh and fish',
		'sbun self info reports the install method',
		'MIT licensed, fully open source'
	];
</script>

<section id="install" class="relative overflow-hidden border-b border-plum/15 py-16 sm:py-20">
	<div class="dot-grid pointer-events-none absolute inset-0 opacity-40"></div>
	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		<SectionHeading
			index="05"
			eyebrow="Get the crate"
			title="Install Swift Bundler 3.0.0."
			intro="Pre-built packages for macOS, Linux and Windows. Each one installs a short sbun alias, shell completions and the long swift-bundler command."
		/>

		<Tabs bind:value={active} class="mt-10 gap-4">
			<TabsList
				class="grid h-auto w-full grid-cols-2 gap-1 border border-plum/20 bg-paper/55 p-1 sm:grid-cols-4"
			>
				{#each targets as target}
					<TabsTrigger
						value={target.id}
						class="h-full justify-start gap-2.5 border border-transparent px-3 py-2.5 text-left data-active:border-plum data-active:bg-plum data-active:text-cream"
					>
						{@const Icon = target.icon}
						<Icon class="size-4 shrink-0" weight="fill" />
						<span class="flex flex-col items-start gap-0.5">
							<span class="font-display text-[12px] font-semibold">{target.name}</span>
							<span class="font-mono text-[8px] uppercase tracking-[0.06em] opacity-55"
								>{target.format}</span
							>
						</span>
					</TabsTrigger>
				{/each}
			</TabsList>

			<TabsContent value="macos" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
					<div class="flex min-w-0 flex-col gap-3">
						<CommandBlock
							label="Signed universal installer"
							command={installCommands.macos}
							note="macOS 13+ · Apple Silicon and Intel · notarized"
						/>
						<CommandBlock
							label="Or install with Mint"
							command="mint install moreSwift/swift-bundler@main"
							note="Mint installs swift-bundler without the sbun alias. Tracks main; pin a tag for a stable version."
						/>
					</div>
					<div class="flex min-w-0 flex-col justify-between border border-plum/20 bg-paper p-5">
						<div>
							<p class="label-type text-rose-deep">Recommended</p>
							<h3 class="mt-2 font-display text-xl font-semibold tracking-tight text-plum">
								The .pkg is the whole crate.
							</h3>
							<p class="mt-2 text-[13px] leading-relaxed text-plum/85">
								A universal binary, shell completions and a receipt in one signed package.
								Uninstall cleanly with pkgutil when you need to.
							</p>
						</div>
						<Button
							href={artifacts.macos}
							size="lg"
							class="mt-6 h-10 gap-2 bg-rose-deep px-4 text-[12px] font-semibold text-cream hover:bg-plum"
						>
							<DownloadSimple class="size-4" weight="bold" />
							Download .pkg
						</Button>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="linux" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
					<div class="flex min-w-0 flex-col gap-3">
						<CommandBlock label="Debian / Ubuntu" command={installCommands.linuxDeb} />
						<CommandBlock label="Fedora / RHEL" command={installCommands.linuxRpm} />
					</div>
					<div class="flex min-w-0 flex-col justify-between border border-plum/20 bg-paper p-5">
						<div>
							<p class="label-type text-rose-deep">Statically linked</p>
							<h3 class="mt-2 font-display text-2xl font-semibold tracking-tight text-plum">
								No runtime hunt required.
							</h3>
							<p class="mt-2 text-[13px] leading-relaxed text-plum/85">
								The Swift Bundler build uses the Static Linux SDK. Install the package, run sbun, and keep
								your distro’s libraries out of the equation.
							</p>
							<div class="mt-4 flex flex-wrap gap-2">
								<a href={artifacts.deb} class="label-type inline-flex items-center gap-1 border border-plum/25 bg-cream px-2 py-1 text-plum hover:bg-peach">
									<DownloadSimple class="size-3" /> .deb
								</a>
								<a href={artifacts.rpm} class="label-type inline-flex items-center gap-1 border border-plum/25 bg-cream px-2 py-1 text-plum hover:bg-peach">
									<DownloadSimple class="size-3" /> .rpm
								</a>
								<a href={artifacts.tarball} class="label-type inline-flex items-center gap-1 border border-plum/25 bg-cream px-2 py-1 text-plum hover:bg-peach">
									<DownloadSimple class="size-3" /> .tar.gz
								</a>
							</div>
						</div>
						<p class="mt-6 font-mono text-[9px] leading-relaxed text-muted-foreground">
							x86_64 packages. Build from source for other architectures.
						</p>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="windows" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
					<CommandBlock
						label="PowerShell"
						command={installCommands.windows}
						note="Windows 10+ · x86_64 · Swift and MSVC runtime DLLs included"
					/>
					<div class="flex min-w-0 flex-col justify-between border border-plum/20 bg-paper p-5">
						<div>
							<p class="label-type text-rose-deep">Native MSI</p>
							<h3 class="mt-2 font-display text-2xl font-semibold tracking-tight text-plum">
								Into Program Files, properly.
							</h3>
							<p class="mt-2 text-[13px] leading-relaxed text-plum/85">
								A 64-bit WiX installer with a stable upgrade code. Prefer a portable copy? The
								.zip has the same binary and runtime DLLs.
							</p>
						</div>
						<div class="mt-6 flex flex-wrap gap-2">
							<Button
								href={artifacts.msi}
								size="lg"
								class="h-10 gap-2 bg-rose-deep px-4 text-[12px] font-semibold text-cream hover:bg-plum"
							>
								<DownloadSimple class="size-4" weight="bold" />
								Download .msi
							</Button>
							<Button
								href={artifacts.zip}
								variant="outline"
								size="lg"
								class="h-10 gap-2 border-plum/25 px-4 text-[12px] font-semibold text-plum hover:bg-cream"
							>
								.zip
							</Button>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="source" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
					<CommandBlock
						label="Build from source"
						command={installCommands.source}
						note="Requires Swift 6. See the installation guide for runtime dependencies."
					/>
					<div class="flex min-w-0 flex-col justify-between border border-plum/20 bg-paper p-5">
						<div>
							<p class="label-type text-rose-deep">Hackable by design</p>
							<h3 class="mt-2 font-display text-2xl font-semibold tracking-tight text-plum">
								Every layer is public.
							</h3>
							<p class="mt-2 text-[13px] leading-relaxed text-plum/85">
								Use the SwiftBundler library, write a custom builder, or add the command plugin to
								your package. The source and issue tracker live on GitHub.
							</p>
						</div>
						<a
							href={githubUrl}
							target="_blank"
							rel="noreferrer"
							class="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-rose-deep hover:text-plum"
						>
							<GithubLogo class="size-3.5" />
							moreSwift/swift-bundler
							<ArrowUpRight class="size-3" />
						</a>
					</div>
				</div>
			</TabsContent>
		</Tabs>

		<div class="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
			<div class="border border-plum/20 bg-paper/60 p-5">
				<div class="flex items-center gap-2">
					<ShieldCheck class="size-4 text-rose-deep" weight="fill" />
					<p class="label-type text-muted-foreground">Signed and verifiable</p>
				</div>
				<p class="mt-2 text-[12.5px] leading-relaxed text-plum/85">
					The macOS package is Developer ID signed and notarized. Windows installers are code
					signed. Release builds embed metadata, so <code class="font-mono text-[11px] text-rose-deep">sbun self info</code>
					tells you exactly how it was installed.
				</p>
			</div>
			<div class="border border-plum/20 bg-paper/60 p-5">
				<div class="flex items-center gap-2">
					<Terminal class="size-4 text-rose-deep" />
					<p class="label-type text-muted-foreground">What’s in the box</p>
				</div>
				<ul class="mt-2.5 grid gap-1.5 sm:grid-cols-2">
					{#each included as item}
						<li class="flex items-start gap-2 text-[12px] leading-snug text-plum/85">
							<Check class="mt-0.5 size-3 shrink-0 text-rose-deep" weight="bold" />
							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<p class="mt-4 font-mono text-[10px] text-plum/40">
			Latest: v{release.version} · {release.date} · <a
				href="{githubUrl}/releases"
				class="underline decoration-plum/25 underline-offset-4 hover:text-plum">all releases</a
			>
		</p>
	</div>
</section>
