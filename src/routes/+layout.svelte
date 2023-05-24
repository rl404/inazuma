<script>
	import Nav from '$lib/components/Nav.svelte';
	import ScrollTop from '$lib/components/ScrollTop.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { setGrayscale, setTheme } from '$lib/utils/theme';

	onMount(() => {
		setTheme();
		setGrayscale();
	});
</script>

<Nav />

<div class="p-20 py-10">
	<slot />
</div>

<ScrollTop />
