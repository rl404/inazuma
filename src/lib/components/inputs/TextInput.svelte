<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import XmarkIcon from '../icons/XmarkIcon.svelte';

	const dispatch = createEventDispatcher<{ enter: any; reset: any }>();

	export let value: string = '';
	export let placeholder: string = '';
	export let inputClass: string = '';
	export { className as class };
	let className: string = '';

	const onEnter = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatch('enter');
	};

	const resetValue = () => {
		value = '';
		dispatch('reset');
	};
</script>

<div class={twMerge('relative', className)}>
	<input
		{placeholder}
		type="text"
		class={twMerge('w-full border-2 border-black pl-1 pr-9 focus:outline-none', inputClass)}
		bind:value
		on:keypress={onEnter}
	/>

	{#if value !== ''}
		<button
			title="clear search"
			class="absolute inset-y-0 right-1 text-red-500 hover:opacity-70"
			on:click={resetValue}
		>
			<XmarkIcon class="size-5" />
		</button>
	{/if}
</div>
