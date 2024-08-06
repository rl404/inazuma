<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import Content1 from './Content1.svelte';
	import Content2 from './Content2.svelte';
	import Content3 from './Content3.svelte';
	import Cover from './Cover.svelte';
</script>

<Head title="Home" description="Manga data in manga style." />

<svelte:head>
	<link rel="canonical" href={`https://inazuma.rl404.com`} />
</svelte:head>

<PortraitPage>
	<Cover />
</PortraitPage>

<PortraitPage>
	<Content1 />
</PortraitPage>

<PortraitPage>
	<Content2 />
</PortraitPage>

<PortraitPage>
	<Content3 />
</PortraitPage>
