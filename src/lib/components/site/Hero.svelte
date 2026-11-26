<script lang="ts">
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import BookOpen from 'phosphor-svelte/lib/BookOpen';
	import RocketLaunch from 'phosphor-svelte/lib/RocketLaunch';
	import { Button } from '$lib/components/ui/button';
	import DotGrid from './DotGrid.svelte';
	import InstallCommand from './InstallCommand.svelte';
	import PlatformStrip from './PlatformStrip.svelte';
	import ShippingLabel from './ShippingLabel.svelte';
	import { githubUrl, openCollectiveUrl, release } from '$lib/content';

</script>

<section class="relative overflow-hidden border-b border-plum/15">
	<DotGrid class="opacity-50" />
	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		<div
			class="grid gap-14 pt-10 pb-12 sm:pt-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-12 lg:py-20"
		>
			<div class="min-w-0">
				<h1
					class="mt-0 font-display text-[2.7rem] font-bold leading-[0.94] tracking-[-0.045em] text-plum sm:text-[3.6rem] md:text-[4.35rem] lg:mt-6"
				>
					<span class="leading-[1.12]">
					Ship Swift
					</span><br />
					<span
						class="relative -mr-3 inline-block -rotate-1 border-2 border-rose-deep bg-paper px-3 pt-1 pb-2 shadow-[5px_5px_0_rgba(112,55,77,0.14)]"
					>
						anywhere.
					</span>
				</h1>

				<p class="mt-6 max-w-xl text-[15px] text-plum/85 sm:text-[17px]">
					Swift Bundler provides everything you need to build and ship Swift apps for every major platform.
				</p>

				<div class="max-w-lg">
					<InstallCommand />
				</div>

				<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
					<Button
						href="https://docs.swiftbundler.dev/documentation/swift-bundler/creating-an-app"
						size="lg"
						class="h-11 gap-2 bg-plum px-5 text-[13px] font-semibold text-cream hover:bg-plum/90"
					>
						<RocketLaunch class="size-4" weight="bold" />
						Quick start
					</Button>
					<Button
						href="https://docs.swiftbundler.dev/documentation/swift-bundler"
						variant="outline"
						size="lg"
						class="h-11 gap-2 border-plum/30 bg-transparent px-5 text-[13px] font-semibold text-plum hover:bg-paper"
					>
						<BookOpen class="size-4" />
						Read the docs
					</Button>
				</div>

				<div class="mt-4 text-[14px] text-plum">
					Enjoying Swift Bundler?
					<a
						href={openCollectiveUrl}
						target="_blank"
						rel="noreferrer"
						class="group inline-flex items-center gap-0.5 font-semibold text-rose-deep hover:text-plum"
					>
						Sponsor its development
						<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
					</a>
				</div>
			</div>

			<div class="relative hidden min-w-0 px-2 sm:px-0 lg:block lg:pl-4">
				<ShippingLabel />
			</div>
		</div>
	</div>

	<PlatformStrip />
</section>
