<script lang="ts">
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: string = '';
	export let placeholder: string = '';
	export let inputClass: string = '';
	export let onEnter: () => void;
	export let onReset: () => void;
	export { className as class };
	let className: string = '';

	const onKeypress = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		onEnter();
	};

	const resetValue = () => {
		value = '';
		onReset();
	};
</script>

<div class={twMerge('relative', className)}>
	<input
		{placeholder}
		type="text"
		class={twMerge('w-full border-2 border-black pr-9 pl-1 focus:outline-none', inputClass)}
		bind:value
		on:keypress={onKeypress}
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
