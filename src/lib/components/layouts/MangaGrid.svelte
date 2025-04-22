<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { toURL } from '$lib/utils';
	import { NSFW } from '$lib/utils/theme';
	import { twMerge } from 'tailwind-merge';
	import type { MangaResponseData } from '../../../routes/api/manga/[id]/+server';

	export let data: MangaResponseData;

	export { className as class };
	let className: string = '';
	let nsfw: boolean = false;

	NSFW.subscribe((v) => (nsfw = v));
</script>

<RenderIfVisible class={twMerge('group aspect-portrait relative border-2 border-black', className)}>
	<a href="/manga/{data.id}/{toURL(data.title)}" title={data.title}>
		<Image
			src={data.picture}
			alt={data.title}
			class={twMerge('group-hover:blur-0 h-full w-full object-cover', data.nsfw && !nsfw && 'blur')}
		/>
		<div
			class="absolute bottom-0 line-clamp-1 w-full border-t border-black bg-white p-0.5 text-center text-xs break-all opacity-0 transition-opacity group-hover:opacity-100 lg:text-sm"
		>
			{data.title}
		</div>
		{#if data.nsfw && !nsfw}
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:hidden"
			>
				<div class="border border-black bg-white px-3 py-1 text-xs lg:text-sm">NSFW</div>
			</div>
		{/if}
	</a>
</RenderIfVisible>
