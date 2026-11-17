<script lang="ts">
	import {
		splitForWrap,
		tokenClass,
		tokenizeLine,
		type CodeLanguage,
		type CodeTone
	} from '$lib/highlight';

	let {
		code,
		language = 'text',
		tone = 'dark',
		lineNumbers = false,
		accentLines = [],
		padded = true,
		inline = false,
		wrap = false,
		minLines,
		size = 'md',
		class: className = ''
	}: {
		code: string;
		language?: CodeLanguage;
		tone?: CodeTone;
		lineNumbers?: boolean;
		accentLines?: number[];
		padded?: boolean;
		inline?: boolean;
		wrap?: boolean;
		minLines?: number;
		size?: 'sm' | 'md';
		class?: string;
	} = $props();

	const lines = $derived(code.split('\n'));
	const textClass = $derived(
		size === 'sm'
			? 'text-[12px] leading-[1.7] sm:text-[12.5px]'
			: 'text-[12.5px] leading-[1.8] sm:text-[13px]'
	);
	const prePadding = $derived(inline ? 'p-0' : padded ? 'px-4 py-3' : 'py-3');
	const linePadding = $derived(inline ? '' : padded ? '' : 'px-3');
	const minHeight = $derived(
		minLines ? `calc(${minLines * 1.8}em + 1.5rem)` : undefined
	);
</script>

<pre
	class="w-full overflow-x-auto font-mono {textClass} {prePadding} {className}"
	style:min-height={minHeight}>{#each lines as line, index}{@const accent = accentLines.includes(index + 1)}<span
			class="flex min-h-[1.8em] {wrap ? 'items-start' : 'items-center'} border-l-2 {accent
				? tone === 'dark'
					? 'border-rose bg-cream/[0.07]'
					: 'border-rose-deep bg-rose/10'
				: 'border-transparent'} {linePadding}">{#if lineNumbers}<span
					class="w-8 shrink-0 select-none pr-3 text-right text-[10px] {tone === 'dark'
						? 'text-cream/25'
						: 'text-plum/35'}"
					aria-hidden="true">{index + 1}</span
				>{/if}<span
					class="{wrap
						? 'min-w-0 flex-1 whitespace-pre-wrap'
						: 'whitespace-pre'} {padded ? '' : 'pr-5'}"
					>{#each tokenizeLine(line, language) as token}{#if token.kind === 'space'}{token.text ||
							' '}{:else}<span class={tokenClass(token.kind, tone)}
								>{#each splitForWrap(token.text, token.kind) as chunk, chunkIndex}{#if chunkIndex > 0}<wbr />{/if}{chunk}{/each}</span
							>{/if}{/each}</span
				></span
			>{/each}</pre>
