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
	class="p-1 bg-white dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-400 border-2 border-black inline-flex items-center {className}"
	type="button"
	{title}
	on:click={onClick}
>
	<slot />
</button>
