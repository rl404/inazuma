<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import Cover from './Cover.svelte';
</script>

<Head title="Home" description="Manga data in manga style." />

<div class="grid gap-5">
	<PortraitPage>
		<Cover />
	</PortraitPage>
</div>
