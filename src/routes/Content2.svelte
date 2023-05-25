<script lang="ts">
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';
	import TopFavorite from './TopFavorite.svelte';
	import TopLightNovel from './TopLightNovel.svelte';
	import TopOneShot from './TopOneShot.svelte';
	import TopPopularity from './TopPopularity.svelte';
</script>

<div class="p-5 grid grid-cols-12 gap-1">
	<div class="col-span-12 text-xs md:text-sm lg:text-base">0. Inazuma</div>
	<RenderIfVisible class="col-span-12">
		<TopPopularity />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-12">
		<TopFavorite />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-12">
		<TopOneShot />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-12">
		<TopLightNovel />
	</RenderIfVisible>
</div>
