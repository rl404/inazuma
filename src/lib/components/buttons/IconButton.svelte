<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title = '';
	export { className as class };
	let className: string = '';

	const dispatch = createEventDispatcher<{ click: never }>();

	const onClick = () => {
		dispatch('click');
	};
</script>

<button
	class="p-1 bg-white hover:bg-neutral-200 border-2 border-black inline-flex items-center {className}"
	type="button"
	{title}
	on:click={onClick}
>
	<slot />
</button>
