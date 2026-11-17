<script lang="ts">
	let {
		value,
		light = false,
		height = 34,
		quietZone = 10,
		class: className = ''
	}: {
		value: string;
		light?: boolean;
		height?: number;
		quietZone?: number;
		class?: string;
	} = $props();

	// Code 39 patterns: 9 elements per character, 1 = wide, 0 = narrow.
	const CODE_39: Record<string, string> = {
		'0': '000110100',
		'1': '100100001',
		'2': '001100001',
		'3': '101100000',
		'4': '000110001',
		'5': '100110000',
		'6': '001110000',
		'7': '000100101',
		'8': '100100100',
		'9': '001100100',
		A: '100001001',
		B: '001001001',
		C: '101001000',
		D: '000011001',
		E: '100011000',
		F: '001011000',
		G: '000001101',
		H: '100001100',
		I: '001001100',
		J: '000011100',
		K: '100000011',
		L: '001000011',
		M: '101000010',
		N: '000010011',
		O: '100010010',
		P: '001010010',
		Q: '000000111',
		R: '100000110',
		S: '001000110',
		T: '000010110',
		U: '110000001',
		V: '011000001',
		W: '111000000',
		X: '010010001',
		Y: '110010000',
		Z: '011010000',
		'-': '010000101',
		'.': '110000100',
		' ': '011000100',
		$: '010101000',
		'/': '010100010',
		'+': '010001010',
		'%': '000101010',
		'*': '010010100'
	};

	const encoded = $derived(
		`*${value.toUpperCase().replace(/[^0-9A-Z\-. $/+%]/g, '') || 'DEV'}*`
	);

	const bars = $derived.by(() => {
		const result: { x: number; width: number }[] = [];
		let x = quietZone;

		for (let charIndex = 0; charIndex < encoded.length; charIndex++) {
			const pattern = CODE_39[encoded[charIndex]];
			if (!pattern) continue;

			for (let index = 0; index < 9; index++) {
				const width = pattern[index] === '1' ? 3 : 1;
				if (index % 2 === 0) result.push({ x, width });
				x += width;
			}

			// One narrow space between characters.
			if (charIndex < encoded.length - 1) x += 1;
		}

		return result;
	});

	const totalModules = $derived(
		bars.length ? bars[bars.length - 1].x + bars[bars.length - 1].width + quietZone : quietZone * 2
	);
</script>

<svg
	class="block w-full {className}"
	style="height: {height}px"
	viewBox="0 0 {totalModules} 40"
	preserveAspectRatio="none"
	role="img"
	aria-label="Barcode encoding build commit {value}"
	shape-rendering="crispEdges"
>
	{#each bars as bar}
		<rect
			x={bar.x}
			y="0"
			width={bar.width}
			height="40"
			fill={light ? '#ffe2ca' : '#70374d'}
		/>
	{/each}
</svg>
