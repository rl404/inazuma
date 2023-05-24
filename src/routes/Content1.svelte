<script lang="ts">
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';
	import CountAuthor from './CountAuthor.svelte';
	import CountGenre from './CountGenre.svelte';
	import CountMagazine from './CountMagazine.svelte';
	import CountManga from './CountManga.svelte';
	import TopRank from './TopRank.svelte';
</script>

<div class="p-5 grid grid-cols-12 gap-1">
	<div class="col-span-12 text-xs">0. Inazuma</div>
	<RenderIfVisible class="col-span-3 border-2 border-black p-1 aspect-video">
		<CountManga />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-3 border-2 border-black p-1 aspect-video">
		<CountAuthor />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-3 border-2 border-black p-1 aspect-video">
		<CountMagazine />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-3 border-2 border-black p-1 aspect-video">
		<CountGenre />
	</RenderIfVisible>
	<RenderIfVisible class="col-span-12">
		<TopRank />
	</RenderIfVisible>
</div>
