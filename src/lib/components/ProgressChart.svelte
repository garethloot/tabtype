<script lang="ts">
	type Point = { x: number; y: number; label: string; value: number };

	type Props = {
		points: Point[];
		yMin?: number;
		yMax?: number;
		formatValue?: (value: number) => string;
		ariaLabel?: string;
	};

	let {
		points,
		yMin = 0,
		yMax = 100,
		formatValue = (v) => String(v),
		ariaLabel = 'Progress chart'
	}: Props = $props();

	const width = 640;
	const height = 220;
	const pad = { top: 16, right: 16, bottom: 28, left: 40 };

	const plotW = width - pad.left - pad.right;
	const plotH = height - pad.top - pad.bottom;

	const range = $derived(Math.max(yMax - yMin, 1));

	const coords = $derived(
		points.map((p, i) => {
			const x =
				points.length === 1
					? pad.left + plotW / 2
					: pad.left + (i / (points.length - 1)) * plotW;
			const y = pad.top + (1 - (p.y - yMin) / range) * plotH;
			return { ...p, cx: x, cy: y };
		})
	);

	const line = $derived(
		coords.length === 0
			? ''
			: coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.cx.toFixed(1)} ${c.cy.toFixed(1)}`).join(' ')
	);

	const ticks = $derived([yMin, yMin + range / 2, yMax].map((v) => ({
		value: v,
		y: pad.top + (1 - (v - yMin) / range) * plotH
	})));
</script>

{#if points.length === 0}
	<p class="empty">No data yet</p>
{:else}
	<svg
		class="chart"
		viewBox="0 0 {width} {height}"
		role="img"
		aria-label={ariaLabel}
	>
		{#each ticks as tick (tick.value)}
			<line
				class="grid"
				x1={pad.left}
				x2={width - pad.right}
				y1={tick.y}
				y2={tick.y}
			/>
			<text class="tick" x={pad.left - 8} y={tick.y + 4} text-anchor="end">
				{formatValue(tick.value)}
			</text>
		{/each}

		<path class="line" d={line} fill="none" />

		{#each coords as c, i (i)}
			<circle class="dot" cx={c.cx} cy={c.cy} r="4">
				<title>{c.label}: {formatValue(c.value)}</title>
			</circle>
		{/each}

		{#if coords.length > 0}
			<text class="axis" x={pad.left} y={height - 6}>{coords[0].label}</text>
			{#if coords.length > 1}
				<text class="axis" x={width - pad.right} y={height - 6} text-anchor="end">
					{coords[coords.length - 1].label}
				</text>
			{/if}
		{/if}
	</svg>
{/if}

<style>
	.empty {
		margin: 0;
		color: var(--ink-soft);
		font-size: 0.95rem;
	}

	.chart {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.grid {
		stroke: color-mix(in srgb, var(--ink-soft) 22%, transparent);
		stroke-width: 1;
	}

	.tick {
		fill: var(--ink-soft);
		font-size: 11px;
		font-family: var(--font-body);
	}

	.line {
		stroke: var(--teal-deep);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.dot {
		fill: var(--teal);
		stroke: #f4fbfa;
		stroke-width: 1.5;
	}

	.axis {
		fill: var(--ink-soft);
		font-size: 11px;
		font-family: var(--font-body);
	}
</style>
