<script lang="ts">
	import type { mangaResponseData } from '../../../api/manga/[id]/+server';
	import Pictures from './Pictures.svelte';

	export let manga: mangaResponseData;

	let tabs = [
		{
			label: 'Synopsis',
			content: manga.synopsis !== '' ? manga.synopsis : 'no synopsis',
			active: true
		},
		{
			label: 'Background',
			content: manga.background !== '' ? manga.background : 'no background',
			active: false
		}
	];

	const changeTab = (i: number) => {
		tabs.forEach((_, j) => {
			tabs[j].active = j === i;
		});
	};
</script>

<div class="p-5 grid grid-cols-12 gap-1">
	<div
		class="col-span-12 text-xs md:text-sm lg:text-base text-ellipsis overflow-x-hidden whitespace-nowrap"
		title={manga.title}
	>
		{manga.id}. {manga.title}
	</div>

	<Pictures class="col-span-3 border-2 border-black" {manga} />

	<div class="col-span-9 grid gap-1">
		{#if manga.alternative_titles.synonyms.length > 0}
			<div
				class="border-2 border-black p-1 bg-gradient-to-l from-red-100 to-white dark:from-red-900 dark:to-black"
			>
				<div class="grid">
					<div class="text-xs md:text-sm lg:text-base text-neutral-400">Synonyms</div>
					<div class="md:text-lg lg:text-xl">{manga.alternative_titles.synonyms.join(', ')}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.english !== ''}
			<div
				class="border-2 border-black p-1 bg-gradient-to-l from-blue-100 to-white dark:from-blue-900 dark:to-black"
			>
				<div class="grid">
					<div class="text-xs md:text-sm lg:text-base text-neutral-400">English</div>
					<div class="md:text-lg lg:text-xl">{manga.alternative_titles.english}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.japanese !== ''}
			<div
				class="border-2 border-black p-1 bg-gradient-to-l from-green-100 to-white dark:from-green-900 dark:to-black"
			>
				<div class="grid">
					<div class="text-xs md:text-sm lg:text-base text-neutral-400">Japanese</div>
					<div class="md:text-lg lg:text-xl">{manga.alternative_titles.japanese}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.synonyms.length === 0 && manga.alternative_titles.english === '' && manga.alternative_titles.japanese === ''}
			<div
				class="border-2 border-black p-1 flex items-center justify-center h-full bg-gradient-to-l from-neutral-100 to-white dark:from-neutral-700 dark:to-black"
			>
				<div class="text-xs md:text-sm lg:text-base text-neutral-400">No alternative titles</div>
			</div>
		{/if}
	</div>

	<div class="col-span-12 flex items-center gap-1">
		{#each tabs as tab, i}
			<button
				on:click={() => changeTab(i)}
				class="border-2 border-black {tabs[i].active
					? 'bg-red-500 text-white'
					: 'dark:bg-neutral-700'} hover:text-black dark:hover:text-white hover:bg-red-200 dark:hover:bg-red-900 text-xs md:text-sm lg:text-base p-1"
				>{tab.label}</button
			>
		{/each}
	</div>

	{#each tabs as tab}
		{#if tab.active}
			<div
				class="col-span-12 md:text-lg lg:text-xl border-2 border-black p-1 whitespace-pre-wrap bg-gradient-to-t from-red-100 to-white dark:from-red-900 dark:to-black"
			>
				{tab.content}
			</div>
		{/if}
	{/each}
</div>
