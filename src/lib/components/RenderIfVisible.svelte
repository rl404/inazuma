<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ click: never }>();

	export { className as class };
	let className = '';
	export let style: string = '';
	export let title: string = '';

	let done: boolean = false;
	let isVisible: boolean = false;
	let element: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				isVisible = entry.isIntersecting;
				done = done || isVisible;
			});
		});

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	});
</script>

<div class={className} {title} {style} bind:this={element} on:click={() => dispatch('click')}>
	{#if isVisible || done}
		<slot />
	{/if}
</div>
