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
			class="w-full h-full object-cover hover:opacity-70"
		/>
		<div
			class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-2xs md:text-xs lg:text-sm text-center bg-white dark:bg-black line-clamp-1 p-0.5 border-t border-black group-hover:text-black dark:group-hover:text-white"
		>
			{data.title}
		</div>
	</a>
</RenderIfVisible>
