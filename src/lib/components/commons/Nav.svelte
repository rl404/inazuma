<script lang="ts">
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import PaletteIcon from '$lib/components/icons/PaletteIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { NSFW, toggleGrayscale, toggleNSFW } from '$lib/utils/theme';
	import { twMerge } from 'tailwind-merge';
	import Image from './Image.svelte';

	let nsfw: boolean = false;

	NSFW.subscribe((v) => (nsfw = v));
</script>

<div class="fixed bottom-0 left-0 z-10 flex w-full items-center justify-center">
	<div class="relative w-full sm:w-lg lg:w-2xl">
		<div class="absolute bottom-0 left-full mb-16 -ml-15 flex flex-col gap-2 sm:mb-4 sm:ml-4">
			<a href="/" title="home" class="size-11 rounded-full border border-black bg-white">
				<Image src="/favicon.ico" alt="logo" class="rounded-full" />
			</a>
			<a href="/manga" title="search" class="rounded-full border border-black bg-white p-2">
				<SearchIcon class="size-6" />
			</a>
			<button
				title="toggle grayscale"
				class="rounded-full border border-black bg-white p-2"
				on:click={toggleGrayscale}
			>
				<PaletteIcon class="size-6" />
			</button>
			<button
				title="toggle grayscale"
				class={twMerge(
					'rounded-full border border-black bg-white p-2 font-bold',
					!nsfw && 'line-through'
				)}
				on:click={toggleNSFW}
			>
				18+
			</button>
			<a
				href="https://github.com/rl404/inazuma"
				target="_blank"
				rel="noreferral"
				title="source code"
				class="rounded-full border border-black bg-white p-2"
			>
				<GithubIcon class="size-6" />
			</a>
		</div>
	</div>
</div>
