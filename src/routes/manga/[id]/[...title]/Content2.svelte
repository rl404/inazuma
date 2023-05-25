<script lang="ts">
	import type { mangaResponseData } from '../../../api/manga/[id]/+server';
	import { formatMALDate } from '$lib/utils';
	import { mangaRelations, mangaStatuses, mangaTypes } from '$lib/utils/const';
	import Image from '$lib/components/Image.svelte';
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';

	export let manga: mangaResponseData;

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

	manga.related.sort((a, b) => {
		return (
			relationOrder.findIndex((r) => r === a.relation) -
			relationOrder.findIndex((r) => r === b.relation)
		);
	});
</script>

<div class="p-5 grid grid-cols-12 gap-1">
	<div
		class="col-span-12 text-xs md:text-sm lg:text-base text-ellipsis overflow-x-hidden whitespace-nowrap"
		title={manga.title}
	>
		{manga.id}. {manga.title}
	</div>

	<div
		class="col-span-6 border-2 border-black p-1 grid grid-cols-2 bg-gradient-to-t from-red-100 to-white dark:from-red-900 dark:to-black"
	>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Type</div>
			<div class="md:text-lg lg:text-xl">{mangaTypes(manga.type)}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Status</div>
			<div class="md:text-lg lg:text-xl">{mangaStatuses(manga.status)}</div>
		</div>
	</div>

	<div
		class="col-span-6 border-2 border-black p-1 grid grid-cols-2 bg-gradient-to-t from-red-100 to-white dark:from-red-900 dark:to-black"
	>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Start Date</div>
			<div class="md:text-lg lg:text-xl">
				{formatMALDate(manga.start_date.year, manga.start_date.month, manga.start_date.day)}
			</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">End Date</div>
			<div class="md:text-lg lg:text-xl">
				{formatMALDate(manga.end_date.year, manga.end_date.month, manga.end_date.day)}
			</div>
		</div>
	</div>

	<div
		class="col-span-3 border-2 border-black p-1 grid bg-gradient-to-t from-orange-100 to-white dark:from-orange-900 dark:to-black"
	>
		<div class="text-xs md:text-sm lg:text-base text-neutral-400">Volume</div>
		<div class="md:text-lg lg:text-xl">{manga.volume.toLocaleString()}</div>
		<div class="text-xs md:text-sm lg:text-base text-neutral-400">Chapter</div>
		<div class="md:text-lg lg:text-xl">{manga.chapter.toLocaleString()}</div>
	</div>

	<div
		class="col-span-9 border-2 border-black p-1 grid grid-cols-3 bg-gradient-to-t from-orange-100 to-white dark:from-orange-900 dark:to-black"
	>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Rank</div>
			<div class="md:text-lg lg:text-xl">#{manga.rank.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Popularity</div>
			<div class="md:text-lg lg:text-xl">#{manga.popularity.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Score</div>
			<div class="md:text-lg lg:text-xl">{manga.mean.toFixed(2)}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Member</div>
			<div class="md:text-lg lg:text-xl">{manga.member.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Voter</div>
			<div class="md:text-lg lg:text-xl">{manga.voter.toLocaleString()}</div>
		</div>
		<div>
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Favorite</div>
			<div class="md:text-lg lg:text-xl">{manga.favorite.toLocaleString()}</div>
		</div>
	</div>

	<div class="col-span-12 grid grid-cols-12 gap-1">
		<div class="col-span-3 text-xs md:text-sm lg:text-base">
			<div class="grid gap-1">
				<div
					class="border-2 border-black p-1 bg-gradient-to-t from-yellow-100 to-white dark:from-yellow-900 dark:to-black"
				>
					<div class="grid">
						<div class="text-neutral-400">Authors</div>
						{#if manga.authors.length === 0} <div>-</div> {/if}
						{#each manga.authors as author}
							<a
								href="/manga?author_id={author.id}"
								title={`${author.name} (${author.role})`}
								class="text-ellipsis overflow-x-hidden whitespace-nowrap">{author.name}</a
							>
						{/each}
					</div>
				</div>

				<div
					class="border-2 border-black p-1 bg-gradient-to-t from-green-100 to-white dark:from-green-900 dark:to-black"
				>
					<div class="grid">
						<div class="text-neutral-400">Serialization</div>
						{#if manga.serialization.length === 0} <div>-</div> {/if}
						{#each manga.serialization as magazine}
							<a
								href="/manga?magazine_id={magazine.id}"
								title={magazine.name}
								class="text-ellipsis overflow-x-hidden whitespace-nowrap">{magazine.name}</a
							>
						{/each}
					</div>
				</div>

				<div
					class="border-2 border-black p-1 bg-gradient-to-t from-blue-100 to-white dark:from-blue-900 dark:to-black"
				>
					<div class="grid">
						<div class="text-neutral-400">Genres</div>
						{#if manga.genres.length === 0} <div>-</div> {/if}
						{#each manga.genres as genre}
							<a
								href="/manga?genre_id={genre.id}"
								title={genre.name}
								class="text-ellipsis overflow-x-hidden whitespace-nowrap">{genre.name}</a
							>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-9">
			<div class="grid grid-cols-2 gap-1">
				{#if manga.related.length === 0}
					<div
						class="col-span-2 border-2 border-black text-center text-xs md:text-sm lg:text-base bg-gradient-to-t from-purple-100 to-white dark:from-purple-900 dark:to-black"
					>
						no related manga
					</div>
				{/if}
				{#each manga.related as related}
					<RenderIfVisible
						class="border-2 border-black aspect-video bg-gradient-to-t from-purple-100 to-white dark:from-purple-900 dark:to-black"
					>
						<a
							href="/manga/{related.id}/{related.title}"
							class="aspect-video grid grid-cols-3 gap-1"
							title={related.title}
							data-sveltekit-reload
						>
							<div>
								<Image
									src={related.picture}
									alt={related.title}
									class="w-full h-full outline outline-1 outline-black bg-neutral-200 dark:bg-neutral-700 object-cover"
								/>
							</div>
							<div class="col-span-2">
								<div class="grid">
									<span class="text-xs md:text-sm lg:text-base text-neutral-400"
										>{mangaRelations(related.relation)}</span
									>
									<span class="text-xs md:text-sm lg:text-base line-clamp-4">{related.title}</span>
								</div>
							</div>
						</a>
					</RenderIfVisible>
				{/each}
			</div>
		</div>
	</div>
</div>
