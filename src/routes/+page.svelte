<script lang="ts">
	import AdoptionSection from '$lib/components/site/AdoptionSection.svelte';
	import AppsSection from '$lib/components/site/AppsSection.svelte';
	import FaqSection from '$lib/components/site/FaqSection.svelte';
	import FeatureGrid from '$lib/components/site/FeatureGrid.svelte';
	import Footer from '$lib/components/site/Footer.svelte';
	import Header from '$lib/components/site/Header.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import InstallSection from '$lib/components/site/InstallSection.svelte';
	import ManifestSection from '$lib/components/site/ManifestSection.svelte';
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
		<ManifestSection />
		<AdoptionSection />
		<FeatureGrid />
		<AppsSection />
		<InstallSection />
		<FaqSection />
	</main>
	<Footer />
</div>
