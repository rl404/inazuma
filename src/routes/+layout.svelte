<script>
	import Nav from '$lib/components/commons/Nav.svelte';
	import ScrollTop from '$lib/components/commons/ScrollTop.svelte';
	import { setGrayscale } from '$lib/utils/theme';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		setGrayscale();
	});
</script>

<Nav />

<div class="flex flex-col items-center gap-5 px-0 py-10 lg:gap-10 lg:px-20">
	<slot />
</div>

<ScrollTop />
