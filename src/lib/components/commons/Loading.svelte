<script lang="ts">
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { twMerge } from 'tailwind-merge';

	export { className as class };
	let className: string = '';
</script>

<SpinnerIcon class={twMerge('animate-spin fill-black text-neutral-200', className)} />
