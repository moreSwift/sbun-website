<script lang="ts">
	import Barcode from './Barcode.svelte';
	import Logo from './Logo.svelte';
	import { release } from '$lib/content';
</script>

<div class="relative mx-auto w-full max-w-[440px] select-none" aria-hidden="true">
	<!-- Offset print shadow -->
	<div class="absolute inset-0 translate-x-3 translate-y-3 bg-rose/35"></div>

	<div class="relative border-2 border-plum bg-paper p-2 shadow-[0_1px_0_0_rgba(112,55,77,0.15)]">
		<div class="relative border border-dashed border-plum/35 p-4 sm:p-5">
			<!-- tape -->
			<div
				class="absolute -left-5 -top-4 h-8 w-24 -rotate-[32deg] border-y border-plum/10 bg-peach/80"
			></div>
			<div
				class="absolute -bottom-6 -right-6 h-8 w-20 -rotate-[32deg] border-y border-plum/10 bg-peach/80"
			></div>

			<div class="flex items-start justify-between gap-3 border-b border-plum/20 pb-3">
				<div>
					<p class="label-type text-rose-deep">moreSwift / logistics</p>
					<p class="mt-1 font-display text-sm font-semibold tracking-tight text-plum">
						Swift Bundler
					</p>
				</div>
				<div class="text-right">
					<p class="label-type text-plum/65">Shipment</p>
					<p class="mt-1 font-mono text-xs font-medium text-plum">SBUN-{release.version}</p>
				</div>
			</div>

			<!-- crate -->
			<div class="relative mt-4 flex h-48 items-center justify-center sm:h-56">
				<div
					class="absolute inset-4 rounded-full border border-dashed border-plum/20 bg-cream/60"
				></div>
				<div class="absolute left-0 top-0 label-type text-plum/30">+</div>
				<div class="absolute right-0 top-0 label-type text-plum/30">+</div>
				<div class="absolute bottom-0 left-0 label-type text-plum/30">+</div>
				<div class="absolute bottom-0 right-0 label-type text-plum/30">+</div>

				<Logo size={168} class="relative drop-shadow-[4px_6px_0_rgba(112,55,77,0.18)]" />

				<span
					class="animate-float absolute -left-2 top-8 border border-plum/30 bg-paper px-2 py-1 font-mono text-[9px] font-medium text-plum shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
					style="--tilt: -7deg; animation-delay: -1s;"
				>
					.AppImage
				</span>
				<span
					class="animate-float absolute -right-2 top-16 border border-plum/30 bg-paper px-2 py-1 font-mono text-[9px] font-medium text-plum shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
					style="--tilt: 5deg; animation-delay: -3s;"
				>
					.msi
				</span>
				<span
					class="animate-float absolute -bottom-1 left-4 border border-plum/30 bg-paper px-2 py-1 font-mono text-[9px] font-medium text-plum shadow-[2px_2px_0_rgba(112,55,77,0.15)]"
					style="--tilt: 3deg; animation-delay: -5s;"
				>
					.apk
				</span>

				<div class="stamp absolute -right-1 bottom-0 bg-paper px-2.5 py-1.5 text-center sm:right-2">
					<p class="font-mono text-[8px] font-semibold uppercase tracking-[0.14em]">Cleared for</p>
					<p class="font-display text-[13px] font-bold uppercase leading-tight">Shipping</p>
					<p class="font-mono text-[7px] tracking-[0.12em] text-rose-deep/80">07 DESTINATIONS</p>
				</div>
			</div>

			<div class="mt-5 border-t border-plum/20 pt-3">
				<div class="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-2 font-mono text-[10px]">
					<span class="label-type pt-0.5 text-muted-foreground">To</span>
					<span class="leading-relaxed text-plum">macOS · iOS · tvOS · visionOS<br />Linux · Windows · Android</span>
					<span class="label-type pt-0.5 text-muted-foreground">Route</span>
					<span class="leading-relaxed text-plum">Package.swift → Bundler.toml → bundle</span>
					<span class="label-type pt-0.5 text-muted-foreground">Contents</span>
					<span class="leading-relaxed text-plum">1 × Swift app · dylibs · resources</span>
				</div>
			</div>

			<div class="mt-4 flex items-end justify-between gap-3 border-t border-plum/20 pt-3">
				<div>
					<Barcode height={30} class="opacity-80" />
					<p class="mt-1 font-mono text-[8px] tracking-[0.3em] text-plum/75">3000 0000 0007</p>
				</div>
				<div class="text-right">
					<p class="label-type text-muted-foreground">Handle</p>
					<p class="font-mono text-[9px] font-medium uppercase tracking-wider text-rose-deep">With care</p>
				</div>
			</div>
		</div>
	</div>
</div>
