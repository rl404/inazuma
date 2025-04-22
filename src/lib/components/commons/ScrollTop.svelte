<script lang="ts">
	import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';

	export let offset: number = 150;
	let hidden: boolean = true;

	const onScroll = () => {
		const container = document.documentElement || document.body;

		if (!container) return;

		if (container.scrollTop > offset) {
			hidden = false;
		} else {
			hidden = true;
		}
	};

	const onClick = () => {
		const container = document.documentElement || document.body;

		container.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<svelte:window on:scroll={onScroll} />

<div class="fixed right-0 bottom-0 p-4" title="scroll to top" class:hidden>
	<button
		type="button"
		class="rounded-full border border-black bg-white p-3 hover:opacity-70"
		on:click={onClick}
	>
		<ChevronUpIcon class="size-4" />
	</button>
</div>
