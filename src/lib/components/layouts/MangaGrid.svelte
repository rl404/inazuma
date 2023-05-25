<script lang="ts">
	import type { mangaResponseData } from '../../../routes/api/manga/[id]/+server';
	import Image from '../Image.svelte';
	import RenderIfVisible from '../RenderIfVisible.svelte';

	export { className as class };
	let className: string = '';

	export let data: mangaResponseData;
</script>

<RenderIfVisible class="{className} relative group" style="aspect-ratio: 7/10;" title={data.title}>
	<a href="/manga/{data.id}/{data.title}" data-sveltekit-reload>
		<Image
			src={data.picture}
			alt={data.title}
			class="w-full h-full object-cover hover:opacity-70 {data.nsfw && 'blur'} group-hover:blur-0"
		/>
		<div
			class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-2xs md:text-xs lg:text-sm text-center bg-white dark:bg-black line-clamp-1 p-0.5 border-t border-black group-hover:text-black dark:group-hover:text-white"
		>
			{data.title}
		</div>
	</a>

	{#if data.nsfw}
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:hidden"
		>
			<div class="bg-white dark:text-black text-xs px-3 py-1 border-2 border-black font-bold">
				NSFW
			</div>
		</div>
	{/if}
</RenderIfVisible>
