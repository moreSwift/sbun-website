<script lang="ts">
	import AdoptionSection from '$lib/components/site/AdoptionSection.svelte';
	import AppsSection from '$lib/components/site/AppsSection.svelte';
	import BetterTogetherSection from '$lib/components/site/BetterTogetherSection.svelte';
	import BundlerListSection from '$lib/components/site/BundlerListSection.svelte';
	import FaqSection from '$lib/components/site/FaqSection.svelte';
	import FeatureGrid from '$lib/components/site/FeatureGrid.svelte';
	import Footer from '$lib/components/site/Footer.svelte';
	import Header from '$lib/components/site/Header.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import InstallSection from '$lib/components/site/InstallSection.svelte';
	import PageSection from '$lib/components/site/PageSection.svelte';
	import SponsorCallout from '$lib/components/site/SponsorCallout.svelte';
	import ManifestSection from '$lib/components/site/ManifestSection.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div id="top">
	<a
		href="#main"
		class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-cream focus:bg-plum focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-cream"
	>
		Skip to content
	</a>
	<Header />
	<main id="main">
		<Hero />
		<BetterTogetherSection />
		<ManifestSection />
		<BundlerListSection />
		<AdoptionSection />
		<FeatureGrid />
		<AppsSection />
		<InstallSection latest={data.latestRelease} />
		<FaqSection />
		<PageSection id="sponsor">
			<SponsorCallout />
		</PageSection>
	</main>
	<Footer />
</div>
