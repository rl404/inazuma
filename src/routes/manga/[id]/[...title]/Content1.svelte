<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { MangaResponseData } from '../../../api/manga/[id]/+server';
	import Pictures from './Pictures.svelte';

	export let manga: MangaResponseData;
	export let nsfw: boolean;

	$: tabs = [
		{
			label: 'Synopsis',
			content: manga.synopsis !== '' ? manga.synopsis : 'no synopsis'
		},
		{
			label: 'Background',
			content: manga.background !== '' ? manga.background : 'no background'
		}
	];

	let tabI: number = 0;

	const changeTab = (i: number) => (tabI = i);
</script>

<div class="grid gap-1">
	<div class="line-clamp-1 break-all text-xs lg:text-base">{manga.id}. {manga.title}</div>

	<div class="grid grid-cols-4 gap-1">
		<Pictures {manga} {nsfw} />
		<div class="col-span-3 grid gap-1">
			{#if manga.alternative_titles.synonyms.length > 0}
				<div class="flex flex-col border-2 border-black bg-gradient-to-l from-red-100 to-white p-2">
					<div class="text-xs text-neutral-400 lg:text-sm">Synonyms</div>
					<div class="text-sm lg:text-base">{manga.alternative_titles.synonyms.join(', ')}</div>
				</div>
			{/if}
			{#if manga.alternative_titles.english !== ''}
				<div
					class="flex flex-col border-2 border-black bg-gradient-to-l from-blue-100 to-white p-2"
				>
					<div class="text-xs text-neutral-400 lg:text-sm">English</div>
					<div class="text-sm lg:text-base">{manga.alternative_titles.english}</div>
				</div>
			{/if}
			{#if manga.alternative_titles.japanese !== ''}
				<div
					class="flex flex-col border-2 border-black bg-gradient-to-l from-green-100 to-white p-2"
				>
					<div class="text-xs text-neutral-400 lg:text-sm">Japanese</div>
					<div class="text-sm lg:text-base">{manga.alternative_titles.japanese}</div>
				</div>
			{/if}
			{#if manga.alternative_titles.synonyms.length === 0 && manga.alternative_titles.english === '' && manga.alternative_titles.japanese === ''}
				<div class="border-2 border-black bg-gradient-to-l from-neutral-100 to-white p-2">
					<div class="text-sm lg:text-base">No alternative titles</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="flex items-center gap-1">
		{#each tabs as tab, i}
			<button
				class={twMerge(
					'border-2 border-black px-2 transition-colors hover:bg-red-200 hover:text-black',
					i === tabI && 'bg-red-500 text-white'
				)}
				on:click={() => changeTab(i)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div
		class="whitespace-pre-wrap border-2 border-black bg-gradient-to-t from-red-100 to-white p-2 text-justify text-sm lg:text-base"
	>
		{tabs[tabI].content}
	</div>
</div>
