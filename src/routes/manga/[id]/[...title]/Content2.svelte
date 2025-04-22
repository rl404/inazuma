<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { formatMALDate, toURL } from '$lib/utils';
	import { mangaRelations, mangaStatuses, mangaTypes } from '$lib/utils/const';
	import type { MangaResponseData } from '../../../api/manga/[id]/+server';

	export let manga: MangaResponseData;

	const relationOrder = [
		'SEQUEL',
		'PREQUEL',
		'ALTERNATIVE_SETTING',
		'ALTERNATIVE_VERSION',
		'SIDE_STORY',
		'PARENT_STORY',
		'SUMMARY',
		'FULL_STORY',
		'SPIN_OFF',
		'ADAPTATION',
		'CHARACTER',
		'OTHER'
	];

	$: manga.related.sort((a, b) => {
		return (
			relationOrder.findIndex((r) => r === a.relation) -
			relationOrder.findIndex((r) => r === b.relation)
		);
	});
</script>

<div class="grid grid-cols-12 gap-1">
	<div class="col-span-12 line-clamp-1 text-xs break-all lg:text-base">
		{manga.id}. {manga.title}
	</div>

	<div
		class="col-span-6 grid grid-cols-2 border-2 border-black bg-gradient-to-t from-red-100 to-white p-2"
	>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Type</div>
			<div class="text-sm lg:text-base">{mangaTypes(manga.type)}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Status</div>
			<div class="text-sm lg:text-base">{mangaStatuses(manga.status)}</div>
		</div>
	</div>

	<div
		class="col-span-6 grid grid-cols-2 border-2 border-black bg-gradient-to-t from-red-100 to-white p-2"
	>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Start Date</div>
			<div class="text-sm lg:text-base">
				{formatMALDate(manga.start_date.year, manga.start_date.month, manga.start_date.day)}
			</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">End Date</div>
			<div class="text-sm lg:text-base">
				{formatMALDate(manga.end_date.year, manga.end_date.month, manga.end_date.day)}
			</div>
		</div>
	</div>

	<div class="col-span-3 grid border-2 border-black bg-gradient-to-t from-orange-100 to-white p-2">
		<div class="text-xs text-neutral-400 lg:text-sm">Volume</div>
		<div class="text-sm lg:text-base">{manga.volume.toLocaleString()}</div>
		<div class="text-xs text-neutral-400 lg:text-sm">Chapter</div>
		<div class="text-sm lg:text-base">{manga.chapter.toLocaleString()}</div>
	</div>

	<div
		class="col-span-9 grid grid-cols-3 border-2 border-black bg-gradient-to-t from-orange-100 to-white p-2"
	>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Rank</div>
			<div class="text-sm lg:text-base">#{manga.rank.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Popularity</div>
			<div class="text-sm lg:text-base">#{manga.popularity.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Score</div>
			<div class="text-sm lg:text-base">{manga.mean.toFixed(2)}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Member</div>
			<div class="text-sm lg:text-base">{manga.member.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Voter</div>
			<div class="text-sm lg:text-base">{manga.voter.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs text-neutral-400 lg:text-sm">Favorite</div>
			<div class="text-sm lg:text-base">{manga.favorite.toLocaleString()}</div>
		</div>
	</div>

	<div class="col-span-3 flex flex-col gap-1">
		<div class="border-2 border-black bg-gradient-to-t from-yellow-100 to-white p-2">
			<div class="text-xs text-neutral-400 lg:text-sm">Authors</div>
			<div class="grid text-sm lg:text-base">
				{#if manga.authors.length === 0}
					<div>-</div>
				{/if}
				{#each manga.authors as author}
					<a
						title={`${author.name} (${author.role})`}
						href="/manga?author_id={author.id}"
						class="line-clamp-1 break-all"
					>
						{author.name}
					</a>
				{/each}
			</div>
		</div>
		<div class="border-2 border-black bg-gradient-to-t from-green-100 to-white p-2">
			<div class="text-xs text-neutral-400 lg:text-sm">Serialization</div>
			<div class="grid text-sm lg:text-base">
				{#if manga.serialization.length === 0}
					<div>-</div>
				{/if}
				{#each manga.serialization as magazine}
					<a
						title={magazine.name}
						href="/manga?magazine_id={magazine.id}"
						class="line-clamp-1 break-all"
					>
						{magazine.name}
					</a>
				{/each}
			</div>
		</div>
		<div class="border-2 border-black bg-gradient-to-t from-blue-100 to-white p-2">
			<div class="text-xs text-neutral-400 lg:text-sm">Genres</div>
			<div class="grid text-sm lg:text-base">
				{#if manga.genres.length === 0}
					<div>-</div>
				{/if}
				{#each manga.genres as genre}
					<a title={genre.name} href="/manga?genre_id={genre.id}" class="line-clamp-1 break-all">
						{genre.name}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="col-span-9">
		<div class="grid grid-cols-2 gap-1">
			{#if manga.related.length === 0}
				<div
					class="col-span-2 border-2 border-black bg-gradient-to-t from-purple-100 to-white p-2 text-center text-sm lg:text-base"
				>
					no related manga
				</div>
			{/if}
			{#each manga.related as related}
				<RenderIfVisible
					class="aspect-video border-2 border-black bg-gradient-to-t from-purple-100 to-white"
				>
					<a
						title={related.title}
						href="/manga/{related.id}/{toURL(related.title)}"
						class="grid h-full w-full grid-cols-3 gap-1"
					>
						<Image
							src={related.picture}
							alt={related.title}
							class="h-full w-full bg-neutral-200 object-cover"
						/>
						<div class="col-span-2 p-1">
							<div class="text-xs text-neutral-400 lg:text-sm">
								{mangaRelations(related.relation)}
							</div>
							<div class="line-clamp-4 text-sm break-all lg:text-base">{related.title}</div>
						</div>
					</a>
				</RenderIfVisible>
			{/each}
		</div>
	</div>
</div>
