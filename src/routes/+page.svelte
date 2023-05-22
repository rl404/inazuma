<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import Content1 from './Content1.svelte';
	import Cover from './Cover.svelte';
</script>

<Head title="Home" description="Manga data in manga style." />

<div class="grid gap-5">
	<PortraitPage>
		<Cover />
	</PortraitPage>

	<PortraitPage>
		<Content1 />
	</PortraitPage>
</div>
