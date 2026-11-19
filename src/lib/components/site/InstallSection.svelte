<script lang="ts">
	import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
	import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardHeader } from '$lib/components/ui/card';
	import CommandLine from './CommandLine.svelte';
	import InstallCommand from './InstallCommand.svelte';
	import PageSection from './PageSection.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SiteCard from './SiteCard.svelte';
	import { artifacts, githubUrl, installCommands, release } from '$lib/content';

	const downloadGroups = [
		{
			name: 'macOS',
			meta: 'Universal installer · macOS 13+',
			icon: AppleLogo,
			files: [{ label: '.pkg', href: artifacts.macos }]
		},
		{
			name: 'Linux',
			meta: 'x86_64 · statically linked',
			icon: LinuxLogo,
			files: [
				{ label: '.deb', href: artifacts.deb },
				{ label: '.rpm', href: artifacts.rpm },
				{ label: '.tar.gz', href: artifacts.tarball }
			]
		},
		{
			name: 'Windows',
			meta: 'x86_64 · Windows 10+',
			icon: WindowsLogo,
			files: [
				{ label: '.msi', href: artifacts.msi },
				{ label: '.zip', href: artifacts.zip }
			]
		}
	];
</script>

<PageSection id="install" grid gridClass="opacity-40" class="overflow-hidden">
	<SectionHeading
		index="05"
		eyebrow="Installation"
		title="Install Swift Bundler."
		intro="Pre-built packages for macOS, Linux and Windows."
	/>

	<div class="mt-10 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
		<SiteCard variant="muted" class="flex flex-col">
			<CardHeader class="px-5 pb-0 pt-5">
				<Badge variant="accent" size="xs" class="mb-2 w-fit font-mono uppercase"
					>Recommended</Badge
				>
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
					Install with one command
				</h3>
			</CardHeader>
			<CardContent class="px-5 pb-5 pt-3">
				<p class="text-[13px] leading-relaxed text-plum/85">
					The command detects your platform, downloads the right installer and installs it for you. Our installers all install an
					<code class="font-mono text-[12px] text-rose-deep">sbun</code> alias alongside <code class="font-mono text-[12px] text-rose-deep">swift-bundler</code>.
				</p>
				<InstallCommand />
			</CardContent>
		</SiteCard>

		<SiteCard variant="muted" class="flex flex-col">
			<CardHeader class="px-5 pb-0 pt-5">
				<Badge variant="site" size="xs" class="mb-2 w-fit font-mono uppercase">Manual</Badge>
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
					Manual installation
				</h3>
			</CardHeader>
			<CardContent class="flex flex-1 flex-col px-5 pb-5 pt-3">
				<p class="text-[13px] leading-relaxed text-plum/85">
					Prefer to manage the download yourself? Grab a release artifact directly.
				</p>

				<div class="mt-4">
					{#each downloadGroups as group}
						{@const Icon = group.icon}
						<div class="flex flex-wrap items-center justify-between gap-3 border-t border-plum/15 py-3 first:border-t-0 first:pt-0">
							<div>
								<div class="flex items-center gap-2">
									<Icon class="size-4 text-plum/70" weight="fill" />
									<span class="font-display text-sm font-semibold text-plum">{group.name}</span>
								</div>
								<p class="mt-0.5 font-mono text-[11px] text-plum/45">{group.meta}</p>
							</div>
							<div class="flex flex-wrap justify-end gap-1.5">
								{#each group.files as file}
									<Badge
										href={file.href}
										variant="site"
										size="default"
										class="gap-1 font-mono"
									>
										<DownloadSimple class="size-3" />
										{file.label}
									</Badge>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-1">
					<a
						href="https://github.com/moreSwift/swift-bundler/releases/latest"
						class="inline-flex shrink-0 items-center gap-1.5 font-mono text-[12px] tracking-wider text-rose-deep hover:text-plum uppercase"
						target="_blank"
					>
						View latest release
						<ArrowUpRight
							class="size-3 mt-0.5"
						/>
					</a>
				</div>
			</CardContent>
		</SiteCard>
	</div>

	<SiteCard variant="muted" class="mt-4">
		<CardHeader class="flex flex-row items-start justify-between gap-4 px-5 pb-0 pt-5">
			<div>
				<Badge variant="site" size="xs" class="mb-2 w-fit font-mono uppercase">Source</Badge>
				<h3 class="font-display text-xl font-semibold tracking-tight text-plum">
					Build from source
				</h3>
			</div>
			<a
				href={githubUrl}
				class="inline-flex shrink-0 items-center gap-1.5 font-mono text-[12px] tracking-wider text-rose-deep hover:text-plum uppercase"
				target="_blank"
			>
				<GithubLogo class="size-3.5" />
				GitHub
				<ArrowUpRight class="size-3" />
			</a>
		</CardHeader>
		<CardContent class="px-5 pb-5 pt-3">
			<p class="max-w-3xl text-[13px] leading-relaxed text-plum/85">
				Building from source requires Swift 6. Clone the repository, build
				the CLI, and copy it into your PATH. To use the <code class="font-mono text-[12px] text-rose-deep">sbun</code> shorthand, install a symlink or create a copy of the CLI.
			</p>
			<div class="mt-4">
				<CommandLine
					command={installCommands.source}
					copyLabel="Copy source install command"
				/>
			</div>
			<a
				href="https://docs.swiftbundler.dev/documentation/swift-bundler/installation"
				class="inline-flex shrink-0 items-center gap-1.5 font-mono text-[12px] tracking-wider text-rose-deep hover:text-plum mt-4 uppercase"
				target="_blank"
			>
				See runtime dependencies
				<ArrowUpRight class="size-3 mt-0.5" />
			</a>
		</CardContent>
	</SiteCard>

	<p class="mt-4 font-mono text-[10px] text-plum/45">
		Latest: v{release.version} · {release.date} · <a
			href="{githubUrl}/releases"
			class="underline decoration-plum/25 underline-offset-4 hover:text-plum">all releases</a
		>
	</p>
</PageSection>
