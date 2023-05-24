<script lang="ts">
	import { ThemeMode, setTheme, toggleGrayscale } from '$lib/utils/theme';
	import Image from './Image.svelte';
	import GithubIcon from './icons/GithubIcon.svelte';
	import MoonIcon from './icons/MoonIcon.svelte';
	import PaletteIcon from './icons/PaletteIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import SunIcon from './icons/SunIcon.svelte';
</script>

<div class="fixed w-full h-full top-0">
	<div class="relative w-lg h-full mx-auto">
		<div class="absolute bottom-10 left-full ml-4 grid gap-2 w-8">
			<a
				href="/"
				class="hover:opacity-70 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black"
				title="home"
			>
				<Image src="/favicon.png" alt="logo" class="rounded-full" />
			</a>
			<a
				href="/manga"
				class="hover:opacity-70 p-1.5 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black"
				title="manga list"
			>
				<SearchIcon class="w-full aspect-square" />
			</a>
			<button
				class="hover:opacity-70 p-1.5 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black"
				on:click={() => toggleGrayscale()}
				title="toggle color mode"
			>
				<PaletteIcon class="w-full aspect-square" />
			</button>
			<button
				class="hover:opacity-70 p-1.5 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black hidden dark:block"
				on:click={() => setTheme(ThemeMode.Light)}
				title="to light mode"
			>
				<MoonIcon class="w-full aspect-square" />
			</button>
			<button
				class="hover:opacity-70 p-1.5 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black block dark:hidden"
				on:click={() => setTheme(ThemeMode.Dark)}
				title="to dark mode"
			>
				<SunIcon class="w-full aspect-square" />
			</button>
			<a
				href="https://github.com/rl404/inazuma"
				target="_blank"
				rel="noreferral"
				class="hover:opacity-70 p-1.5 rounded-full border border-black dark:border-neutral-600 bg-white dark:bg-black"
				title="source code"
			>
				<GithubIcon class="w-full aspect-square" />
			</a>
		</div>
	</div>
</div>
