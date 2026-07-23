<script lang="ts">
	type Shortcut = { keys: string; label: string };

	type Props = {
		items: Shortcut[];
		ariaLabel?: string;
	};

	let { items, ariaLabel = 'Keyboard shortcuts' }: Props = $props();
</script>

<p class="shortcuts" aria-label={ariaLabel}>
	{#each items as item, i (`${item.keys}-${item.label}`)}
		{#if i > 0}<span class="sep" aria-hidden="true">·</span>{/if}
		<span class="item"><kbd>{item.keys}</kbd> {item.label}</span>
	{/each}
</p>

<style>
	.shortcuts {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.55rem;
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-soft);
		line-height: 1.4;
	}

	.sep {
		opacity: 0.55;
	}

	.item {
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
	}

	kbd {
		font-family: var(--font-mono);
		font-size: 0.78em;
		font-weight: 500;
		padding: 0.12em 0.4em;
		border: 1px solid color-mix(in srgb, var(--ink-soft) 28%, transparent);
		border-radius: 0.25rem;
		background: color-mix(in srgb, var(--surface) 70%, transparent);
		color: var(--teal-deep);
	}
</style>
