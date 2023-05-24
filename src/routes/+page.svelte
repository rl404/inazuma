<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import Content1 from './Content1.svelte';
	import Cover from './Cover.svelte';
	import Content2 from './Content2.svelte';
	import Content3 from './Content3.svelte';
</script>

<Head title="Home" description="Manga data in manga style." />

<div class="grid gap-5">
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
</div>
