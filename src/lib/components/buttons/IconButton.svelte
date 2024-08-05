<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let title = '';
	export { className as class };
	let className: string = '';
</script>

<button
	{title}
	class={twMerge(
		'inline-flex items-center border-2 border-black bg-white p-1 hover:bg-neutral-200',
		className
	)}
	on:click
>
	<slot />
</button>
