<script lang="ts">
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import { Tabs, TabsContent } from '$lib/components/ui/tabs';
	import CheckList from './CheckList.svelte';
	import CommandBlock from './CommandBlock.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import TabSelector from './TabSelector.svelte';
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

	const installTargets = targets.map((target) => ({
		id: target.id,
		name: target.name,
		meta: target.format,
		icon: target.icon
	}));

	let active = $state('macos');

	const included = [
		'swift-bundler plus the short sbun alias',
		'Shell completions for bash, zsh and fish',
		'sbun self info reports the install method',
		'MIT licensed, fully open source'
	];

	const macosIncludes = ['Universal binary', 'Shell completions', 'Install receipt'];
	const windowsIncludes = ['.msi installer or portable .zip', 'Swift and MSVC runtime DLLs', 'Stable upgrade code'];
	const sourceIncludes = ['Swift 6 toolchain', 'SwiftBundler library', 'Custom builder API'];
</script>

<PageSection id="install" grid gridClass="opacity-40" class="overflow-hidden">
		<SectionHeading
			index="05"
			eyebrow="Get the crate"
			title="Install Swift Bundler 3.0.0."
			intro="Pre-built packages for macOS, Linux and Windows. Each one installs a short sbun alias, shell completions and the long swift-bundler command."
		/>

		<Tabs bind:value={active} class="mt-10 gap-4">
			<TabSelector items={installTargets} label="Choose a platform" />

			<TabsContent value="macos" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:min-h-[25rem] lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
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
					<SiteCard class="flex min-w-0 flex-col">
						<CardHeader class="px-5 pb-0 pt-5">
							<Badge variant="accent" size="xs" class="mb-2 font-mono uppercase">Recommended</Badge>
							<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
								The .pkg is the whole crate.
							</h3>
						</CardHeader>
						<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-3">
							<p class="text-[13px] leading-relaxed text-plum/85">
								A universal binary, shell completions and a receipt in one signed package.
								Uninstall cleanly with pkgutil when you need to.
							</p>
							<CheckList items={macosIncludes} size="xs" mono class="mt-4" />
							<p class="mt-4 border-t border-plum/15 pt-3 font-mono text-[9px] leading-relaxed text-plum/45">
								SHA-256 checksums are attached to the release.
							</p>
						</CardContent>
						<CardFooter class="mt-auto border-0 px-5 pb-5 pt-0">
							<Button
								href={artifacts.macos}
								size="lg"
								class="h-10 w-full gap-2 rounded-none bg-rose-deep px-4 text-[12px] font-semibold text-cream hover:bg-plum"
							>
								<DownloadSimple class="size-4" weight="bold" />
								Download .pkg
							</Button>
						</CardFooter>
					</SiteCard>
				</div>
			</TabsContent>

			<TabsContent value="linux" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:min-h-[25rem] lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
					<div class="flex min-w-0 flex-col gap-3">
						<CommandBlock label="Debian / Ubuntu" command={installCommands.linuxDeb} />
						<CommandBlock label="Fedora / RHEL" command={installCommands.linuxRpm} />
					</div>
					<SiteCard class="flex min-w-0 flex-col">
						<CardHeader class="px-5 pb-0 pt-5">
							<Badge variant="accent" size="xs" class="mb-2 font-mono uppercase"
								>Statically linked</Badge
							>
							<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
								No runtime hunt required.
							</h3>
						</CardHeader>
						<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-3">
							<p class="text-[13px] leading-relaxed text-plum/85">
								The Swift Bundler build uses the Static Linux SDK. Install the package, run sbun,
								and keep your distro’s libraries out of the equation.
							</p>
							<div class="mt-4 flex flex-wrap gap-2">
								<Badge href={artifacts.deb} variant="site" size="sm" class="gap-1 font-mono uppercase">
									<DownloadSimple class="size-3" /> .deb
								</Badge>
								<Badge href={artifacts.rpm} variant="site" size="sm" class="gap-1 font-mono uppercase">
									<DownloadSimple class="size-3" /> .rpm
								</Badge>
								<Badge
									href={artifacts.tarball}
									variant="site"
									size="sm"
									class="gap-1 font-mono uppercase"
								>
									<DownloadSimple class="size-3" /> .tar.gz
								</Badge>
							</div>
						</CardContent>
						<CardFooter
							class="mt-auto border-0 px-5 pb-5 pt-0 font-mono text-[9px] leading-relaxed text-plum/45"
						>
							x86_64 packages. Build from source for other architectures.
						</CardFooter>
					</SiteCard>
				</div>
			</TabsContent>

			<TabsContent value="windows" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:min-h-[25rem] lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
					<CommandBlock
						label="PowerShell"
						command={installCommands.windows}
						note="Windows 10+ · x86_64 · Swift and MSVC runtime DLLs included"
					/>
					<SiteCard class="flex min-w-0 flex-col">
						<CardHeader class="px-5 pb-0 pt-5">
							<Badge variant="accent" size="xs" class="mb-2 font-mono uppercase">Native MSI</Badge>
							<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
								Into Program Files, properly.
							</h3>
						</CardHeader>
						<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-3">
							<p class="text-[13px] leading-relaxed text-plum/85">
								A 64-bit WiX installer with a stable upgrade code. Prefer a portable copy? The
								.zip has the same binary and runtime DLLs.
							</p>
							<CheckList items={windowsIncludes} size="xs" mono class="mt-4" />
						</CardContent>
						<CardFooter class="mt-auto flex gap-2 border-0 px-5 pb-5 pt-0">
							<Button
								href={artifacts.msi}
								size="lg"
								class="h-10 flex-1 gap-2 rounded-none bg-rose-deep px-4 text-[12px] font-semibold text-cream hover:bg-plum"
							>
								<DownloadSimple class="size-4" weight="bold" />
								Download .msi
							</Button>
							<Button
								href={artifacts.zip}
								variant="outline"
								size="lg"
								class="h-10 rounded-none border-plum/25 px-4 text-[12px] font-semibold text-plum hover:bg-cream"
							>
								.zip
							</Button>
						</CardFooter>
					</SiteCard>
				</div>
			</TabsContent>

			<TabsContent value="source" class="mt-0 focus-visible:outline-none">
				<div class="grid gap-4 lg:min-h-[25rem] lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
					<CommandBlock
						label="Build from source"
						command={installCommands.source}
						note="Requires Swift 6. See the installation guide for runtime dependencies."
					/>
					<SiteCard class="flex min-w-0 flex-col">
						<CardHeader class="px-5 pb-0 pt-5">
							<Badge variant="accent" size="xs" class="mb-2 font-mono uppercase"
								>Hackable by design</Badge
							>
							<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
								Every layer is public.
							</h3>
						</CardHeader>
						<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-3">
							<p class="text-[13px] leading-relaxed text-plum/85">
								Use the SwiftBundler library, write a custom builder, or add the command plugin to
								your package. The source and issue tracker live on GitHub.
							</p>
							<CheckList items={sourceIncludes} size="xs" mono class="mt-4" />
						</CardContent>
						<CardFooter class="mt-auto border-0 px-5 pb-5 pt-0">
							<a
								href={githubUrl}
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-rose-deep hover:text-plum"
							>
								<GithubLogo class="size-3.5" />
								moreSwift/swift-bundler
								<ArrowUpRight class="size-3" />
							</a>
						</CardFooter>
					</SiteCard>
				</div>
			</TabsContent>
		</Tabs>

		<div class="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
			<SiteCard variant="muted">
				<CardContent class="p-5">
					<div class="flex items-center gap-2">
						<ShieldCheck class="size-4 text-rose-deep" weight="fill" />
						<p class="label-type text-plum/45">Signed and verifiable</p>
					</div>
					<p class="mt-2 text-[12.5px] leading-relaxed text-plum/85">
						The macOS package is Developer ID signed and notarized. Windows installers are code
						signed. Release builds embed metadata, so <code class="font-mono text-[11px] text-rose-deep"
							>sbun self info</code
						> tells you exactly how it was installed.
					</p>
				</CardContent>
			</SiteCard>
			<SiteCard variant="muted">
				<CardContent class="p-5">
					<div class="flex items-center gap-2">
						<Terminal class="size-4 text-rose-deep" />
						<p class="label-type text-plum/45">What’s in the box</p>
					</div>
					<CheckList items={included} columns class="mt-2.5" />
				</CardContent>
			</SiteCard>
		</div>

		<p class="mt-4 font-mono text-[10px] text-plum/45">
			Latest: v{release.version} · {release.date} · <a
				href="{githubUrl}/releases"
				class="underline decoration-plum/25 underline-offset-4 hover:text-plum">all releases</a
			>
		</p>
</PageSection>
