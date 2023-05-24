<script lang="ts">
	import { PUBLIC_MAL_HOST } from '$env/static/public';
	import Image from '$lib/components/Image.svelte';
	import type { mangaResponseData } from '../../../api/manga/[id]/+server';

	export let manga: mangaResponseData;
</script>

<Image
	src={manga.picture}
	alt={manga.title}
	class="absolute w-full h-full object-cover -z-10 {manga.nsfw && 'blur'}"
/>

<div class="absolute bottom-0 right-0 w-1/2 p-5 text-right">
	<a
		href={`${PUBLIC_MAL_HOST}/manga/${manga.id}`}
		target="_blank"
		rel="noreferral"
		class="font-bold text-xl text-shadow-sm shadow-white dark:shadow-black"
	>
		{manga.title}
	</a>
</div>

<div class="absolute bottom-0 left-0 w-1/2 p-5 grid">
	{#each manga.authors as author}
		<a
			href={`/manga?author_id=${author.id}`}
			target="_blank"
			rel="noreferral"
			class="font-bold text-shadow-sm shadow-white dark:shadow-black"
			title={author.role}
		>
			{author.name}
		</a>
	{/each}
</div>

<div class="absolute w-1/2 p-5 grid">
	{#each manga.serialization as magazine}
		<a
			href={`/manga?magazine_id=${magazine.id}`}
			target="_blank"
			rel="noreferral"
			class="font-bold text-shadow-sm shadow-white dark:shadow-black"
		>
			{magazine.name}
		</a>
	{/each}
</div>

{#if manga.nsfw}
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45">
		<div class="bg-white dark:text-black text-3xl px-4 py-1 border-2 border-black font-bold">
			NSFW
		</div>
	</div>
{/if}
