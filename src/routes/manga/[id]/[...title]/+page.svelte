<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import type { mangaResponse } from '../../../api/manga/[id]/+server';
	import Content1 from './Content1.svelte';
	import Content2 from './Content2.svelte';
	import Cover from './Cover.svelte';

	export let data: mangaResponse;
	const manga = data.data;
</script>

<Head title={manga.title} description={manga.synopsis} image={manga.picture} />

<div class="grid gap-5">
	<PortraitPage>
		<Cover {manga} />
	</PortraitPage>

	<PortraitPage>
		<Content1 {manga} />
	</PortraitPage>

	<PortraitPage>
		<Content2 {manga} />
	</PortraitPage>
</div>
