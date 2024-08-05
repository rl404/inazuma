<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import Image from '$lib/components/commons/Image.svelte';
</script>

<Image
	src="/inazuma.png"
	alt="inazuma"
	class="h-full w-full border-2 border-black bg-gradient-to-b from-white to-red-400 object-cover object-center"
/>

<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
	<div class="grid text-center shadow-white text-shadow-sm">
		<h1 class="text-4xl font-bold lg:text-5xl">INAZUMA</h1>
		<Border />
		<h2>Manga data in manga style</h2>
	</div>
</div>
