<script lang="ts">
	import ImageIcon from '$lib/components/icons/ImageIcon.svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let src: string;
	export let alt: string;
	export { className as class };
	let className: string;

	let loading = true;
	let error = false;

	onMount(() => {
		if (src === '') return;

		const img = new Image();
		img.src = src;

		img.onload = () => {
			loading = false;
		};

		img.onerror = () => {
			loading = false;
			error = true;
		};
	});
</script>

{#if src === ''}
	<div
		class={twMerge(
			'flex aspect-square items-center justify-center overflow-hidden text-center',
			className
		)}
	>
		{alt}
	</div>
{:else if loading}
	<div class={twMerge('flex aspect-square animate-pulse items-center justify-center', className)}>
		<ImageIcon class="w-1/4 opacity-20" />
	</div>
{:else if error}
	<div
		class={twMerge(
			'flex aspect-square items-center justify-center overflow-hidden text-center',
			className
		)}
	>
		{alt}
	</div>
{:else}
	<img {src} {alt} class={className} />
{/if}
