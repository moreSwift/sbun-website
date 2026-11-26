<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import SectionHeading from './SectionHeading.svelte';
	import PageSection from './PageSection.svelte';
	import SiteCard from './SiteCard.svelte';
	import { apps, githubUrl } from '$lib/content';
</script>

<PageSection id="apps">
		<SectionHeading
			title="Apps built with Swift Bundler."
			intro="Games, plugin managers, visualisers and utilities; all built with Swift Bundler."
		/>

		<div class="mt-8 sm:mt-10">
			<p
				class="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-plum/45 sm:hidden"
			>
				Swipe to browse
				<ArrowRight class="size-3.5 text-rose-deep" aria-hidden="true" />
			</p>

			<div
				class="-mx-4 overflow-x-auto overscroll-x-contain scroll-px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:overflow-visible sm:pb-0"
				role="region"
				aria-label="Apps built with Swift Bundler"
			>
				<div
					class="flex w-max snap-x snap-mandatory gap-3 px-4 sm:grid sm:w-auto sm:snap-none sm:grid-cols-2 sm:px-0 lg:grid-cols-3"
				>
					{#each apps as app, index}
						<a
							href={app.href}
							target="_blank"
							rel="noreferrer"
							class="group block w-[85vw] max-w-[320px] shrink-0 snap-start sm:h-full sm:w-auto sm:max-w-none"
						>
							<SiteCard
								class="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-plum/45 group-hover:shadow-[4px_4px_0_rgba(112,55,77,0.13)]"
							>
								<CardHeader
									class="flex flex-row items-center justify-between gap-3 px-5 pb-0 pt-5"
								>
									<Badge
										variant="ghost"
										size="xs"
										class="px-0 font-mono uppercase tracking-[0.14em] text-plum/45"
									>
										Receipt / {String(index + 1).padStart(3, '0')}
									</Badge>
									<span class="flex gap-1">
										{#each app.platforms as platform}
											<Badge variant="site" size="xs" class="font-mono uppercase">{platform}</Badge>
										{/each}
									</span>
								</CardHeader>

								<CardContent class="flex flex-1 flex-col px-5 pb-4 pt-5">
									<h3
										class="font-display text-xl font-semibold tracking-tight text-plum transition-colors group-hover:text-rose-deep"
									>
										{app.name}
									</h3>
									<p class="mt-2 flex-1 text-[13px] leading-relaxed text-plum/85">
										{app.description}
									</p>
								</CardContent>

								<CardFooter
									class="mt-auto justify-between border-t border-dashed border-plum/25 px-5 py-3"
								>
									<span class="text-plum/45 text-[12px]">Delivered</span>
									<span
										class="flex items-center gap-1 text-[12px] tracking-wider text-rose-deep"
									>
										Visit app
										<ArrowUpRight
											class="size-3"
										/>
									</span>
								</CardFooter>
							</SiteCard>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<SiteCard variant="dashed" class="mt-4">
			<CardContent class="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-[13px] leading-relaxed text-plum/85">
					<span class="font-semibold text-plum">Built something with Swift Bundler?</span>
					Let us know!
				</p>
				<Button
					href="{githubUrl}/issues/new"
					variant="outline"
					size="sm"
					class="h-auto shrink-0 gap-1.5 rounded-none border-plum/25 bg-paper px-3 py-1.5 font-mono text-[12px] text-plum hover:bg-peach"
				>
					<GithubLogo class="size-3.5" />
					Submit your app
				</Button>
			</CardContent>
		</SiteCard>
</PageSection>
