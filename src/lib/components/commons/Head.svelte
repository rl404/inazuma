<script lang="ts">
	import Analytics from './Analytics.svelte';

	export let title = 'Home';
	export let description = '';
	export let image = '';
</script>

<svelte:head>
	<title>{`${title} | Inazuma`}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Inazuma" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="Content-Type" content="text/html charset=utf-8" />
	<meta name="theme-color" content="#ef4444" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Analytics />
