<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import XmarkIcon from '../icons/XmarkIcon.svelte';

	export let value: string = '';
	export let placeholder: string = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ enter: never }>();

	const onEnter = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatch('enter');
	};

	const resetValue = () => {
		value = '';
	};
</script>

<div class="relative {className}">
	{#if value !== ''}
		<div
			class="absolute inset-y-0 right-0 flex items-center pr-2 text-red-500 hover:text-neutral-400 cursor-pointer"
			title="clear search"
			on:click={resetValue}
		>
			<XmarkIcon class="w-5 h-5" />
		</div>
	{/if}

	<input
		{placeholder}
		type="text"
		class="w-full pl-1 pr-9 bg-white bg-gradient-to-r from-white to-red-200 border-2 border-black focus:outline-none"
		bind:value
		on:keypress={onEnter}
	/>
</div>
