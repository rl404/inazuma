<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import CountAuthor from './CountAuthor.svelte';
	import CountGenre from './CountGenre.svelte';
	import CountMagazine from './CountMagazine.svelte';
	import CountManga from './CountManga.svelte';
	import TopRank from './TopRank.svelte';
</script>

<div class="grid gap-4">
	<div>0. Inazuma</div>
	<div class="grid grid-cols-4 gap-1">
		<RenderIfVisible class="aspect-video border-2 border-black p-1">
			<CountManga />
		</RenderIfVisible>
		<RenderIfVisible class="aspect-video border-2 border-black p-1">
			<CountAuthor />
		</RenderIfVisible>
		<RenderIfVisible class="aspect-video border-2 border-black p-1">
			<CountMagazine />
		</RenderIfVisible>
		<RenderIfVisible class="aspect-video border-2 border-black p-1">
			<CountGenre />
		</RenderIfVisible>
	</div>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<TopRank />
	</RenderIfVisible>
</div>
