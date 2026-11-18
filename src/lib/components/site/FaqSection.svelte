<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';
	import SectionHeading from './SectionHeading.svelte';
	import { faqs } from '$lib/content';

	let open = $state<string | undefined>('item-0');
</script>

<section id="faq" class="border-b border-plum/15 py-16 sm:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
		<div>
			<SectionHeading
				index="06"
				eyebrow="Before you ship"
				title="Frequently asked questions."
				intro="If your questions isn't here, check the docs!"
			/>
			<a
				href="https://docs.swiftbundler.dev/documentation/swift-bundler/troubleshooting"
				class="label-type mt-6 inline-flex items-center gap-1 text-rose-deep hover:text-plum"
			>
				Troubleshooting guide →
			</a>
		</div>

		<Accordion
			type="single"
			bind:value={open}
			class="border-t border-plum/25"
		>
			{#each faqs as faq, index}
				<AccordionItem value="item-{index}" class="border-b border-plum/25 py-1">
					<AccordionTrigger
						class="items-center gap-4 py-4 font-display text-[15px] font-semibold tracking-tight text-plum hover:no-underline hover:text-rose-deep sm:text-base"
					>
						{faq.question}
					</AccordionTrigger>
					<AccordionContent class="pb-4 pr-8">
						<p class="text-[13px] leading-relaxed text-plum/85">{faq.answer}</p>
					</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>
