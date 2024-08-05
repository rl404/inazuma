<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import TopFavorite from './TopFavorite.svelte';
	import TopLightNovel from './TopLightNovel.svelte';
	import TopOneShot from './TopOneShot.svelte';
	import TopPopularity from './TopPopularity.svelte';
</script>

<div class="grid gap-4">
	<div>0. Inazuma</div>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<TopPopularity />
	</RenderIfVisible>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<TopFavorite />
	</RenderIfVisible>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<TopOneShot />
	</RenderIfVisible>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<TopLightNovel />
	</RenderIfVisible>
</div>
