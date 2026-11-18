<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Table,
		TableBody,
		TableCell,
		TableRow
	} from '$lib/components/ui/table';
	import Barcode from './Barcode.svelte';
	import BarcodePlaceholder from './BarcodePlaceholder.svelte';
	import Logo from './Logo.svelte';
	import SiteCard from './SiteCard.svelte';
	import { buildCommit } from '$lib/commit';
	import { release } from '$lib/content';
</script>

<div class="relative mx-auto w-full max-w-[440px] select-none" aria-hidden="true">
	<!-- Offset print shadow -->
	<div class="absolute inset-0 translate-x-3 translate-y-3 bg-rose/35"></div>

	<SiteCard variant="label" class="relative overflow-visible">
		<CardContent class="relative p-2">
			<div class="relative border border-dashed border-plum/35 p-4 sm:p-5">
				<!-- tape -->
				<div
					class="absolute -left-5 -top-4 h-8 w-20 -rotate-[32deg] border-y border-plum/10 bg-peach/80"
				></div>
				<div
					class="absolute -bottom-6 -right-6 h-8 w-20 -rotate-[32deg] border-y border-plum/10 bg-peach/80"
				></div>

				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="label-type text-rose-deep">moreSwift / logistics</p>
						<p class="mt-1 font-display text-sm font-semibold tracking-tight text-plum">
							Swift Bundler
						</p>
					</div>
					<div class="text-right">
						<p class="label-type text-plum/45">Shipment</p>
						<p class="mt-1 font-mono text-xs font-medium text-plum">SBUN-{release.version}</p>
					</div>
				</div>

				<Separator class="my-3 bg-plum/20" />

				<!-- logo -->
				<div class="relative flex h-48 items-center justify-center sm:h-56">
					<div
						class="absolute inset-4 rounded-full border border-dashed border-plum/20 bg-cream/60"
					></div>
					<div class="absolute left-0 top-0 label-type text-plum/30">+</div>
					<div class="absolute right-0 top-0 label-type text-plum/30">+</div>
					<div class="absolute bottom-0 left-0 label-type text-plum/30">+</div>
					<div class="absolute bottom-0 right-0 label-type text-plum/30">+</div>

					<Logo size={168} class="relative drop-shadow-[4px_6px_0_rgba(112,55,77,0.18)]" />

					<Badge
						variant="site"
						size="sm"
						class="animate-float absolute -left-2 top-8 px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
						style="--tilt: -7deg; animation-delay: -1s;"
					>
						.AppImage
					</Badge>
					<Badge
						variant="site"
						size="sm"
						class="animate-float absolute -right-2 top-16 px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
						style="--tilt: 5deg; animation-delay: -3s;"
					>
						.msi
					</Badge>
					<Badge
						variant="site"
						size="sm"
						class="animate-float absolute -bottom-1 left-4 px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
						style="--tilt: 3deg; animation-delay: -5s;"
					>
						.apk
					</Badge>

					<div class="absolute -right-1 bottom-0 -rotate-[7deg] border-2 border-rose-deep bg-paper px-2.5 py-1.5 text-center text-rose-deep sm:right-2"
						style="box-shadow: inset 0 0 0 2px var(--paper)">
						<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
							Cleared for
						</p>
						<p class="font-display text-[13px] font-bold uppercase leading-tight">Shipping</p>
						<p class="font-mono text-[9px] tracking-[0.1em] text-rose-deep/80">
							7 DESTINATIONS
						</p>
					</div>
				</div>

				<Separator class="mt-4 bg-plum/20" />

				<Table class="text-[10px]">
					<TableBody>
						<TableRow class="border-none hover:bg-transparent">
							<TableCell
								class="w-[4.5rem] whitespace-normal py-1.5 pl-0 pr-3 align-baseline font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-plum/45"
							>
								To
							</TableCell>
							<TableCell class="whitespace-normal p-0 py-1.5 align-top font-mono text-[10px] leading-relaxed text-plum/85">
								macOS · iOS · tvOS · visionOS<br />Linux · Windows · Android
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Separator class="my-3 bg-plum/20" />

				<div class="flex items-end justify-between gap-3">
					<div class="min-w-0 flex-1 pr-2">
						<div class="w-3/4">
							{#if $buildCommit.status === 'scanning'}
								<BarcodePlaceholder height={32} />
							{:else}
								<Barcode
									value={$buildCommit.value}
									height={32}
									quietZone={0}
									class="animate-in fade-in opacity-90 duration-300"
								/>
							{/if}
						</div>
						{#if $buildCommit.status === 'scanning'}
							<p class="mt-1 font-mono text-[10px] tracking-[0.18em] text-plum/65">SCANNING</p>
						{:else}
							<p class="mt-1 font-mono text-[10px] tracking-[0.18em] text-plum/65">
								{$buildCommit.value}
							</p>
						{/if}
					</div>
					<div class="text-right">
						<p class="label-type text-plum/45">Handle</p>
						<p class="font-mono text-[10px] font-medium uppercase tracking-wider text-rose-deep">
							With care
						</p>
					</div>
				</div>
			</div>
		</CardContent>
	</SiteCard>
</div>
