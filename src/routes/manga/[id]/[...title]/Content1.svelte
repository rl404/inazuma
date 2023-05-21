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
		class="col-span-12 text-xs text-ellipsis overflow-x-hidden whitespace-nowrap"
		title={manga.title}
	>
		{manga.id}. {manga.title}
	</div>

	<Pictures class="col-span-3 border-2 border-black" {manga} />

	<div class="col-span-9 grid gap-1">
		{#if manga.alternative_titles.synonyms.length > 0}
			<div class="border-2 border-black p-1">
				<div class="grid">
					<div class="text-xs text-neutral-400">Synonyms</div>
					<div>{manga.alternative_titles.synonyms.join(', ')}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.english !== ''}
			<div class="border-2 border-black p-1">
				<div class="grid">
					<div class="text-xs text-neutral-400">English</div>
					<div>{manga.alternative_titles.english}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.japanese !== ''}
			<div class="border-2 border-black p-1">
				<div class="grid">
					<div class="text-xs text-neutral-400">Japanese</div>
					<div>{manga.alternative_titles.japanese}</div>
				</div>
			</div>
		{/if}
		{#if manga.alternative_titles.synonyms.length === 0 && manga.alternative_titles.english === '' && manga.alternative_titles.japanese === ''}
			<div class="border-2 border-black p-1 flex items-center justify-center h-full">
				<div class="text-xs text-neutral-400">No alternative titles</div>
			</div>
		{/if}
	</div>

	<div class="col-span-12 flex items-center gap-1">
		{#each tabs as tab, i}
			<button
				on:click={() => changeTab(i)}
				class="border-2 border-black {tabs[i].active &&
					'bg-black text-white'} hover:text-black hover:bg-neutral-200 text-xs p-1"
				>{tab.label}</button
			>
		{/each}
	</div>

	{#each tabs as tab}
		{#if tab.active}
			<div class="col-span-12 border-2 border-black p-1 whitespace-pre-wrap">
				{tab.content}
			</div>
		{/if}
	{/each}
</div>
