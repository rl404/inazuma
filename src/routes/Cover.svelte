<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import Image from '$lib/components/Image.svelte';
</script>

<div class="p-5 h-full w-full">
	<Image
		src="/inazuma.png"
		alt="inazuma"
		class="w-full h-full object-cover object-center grayscale border-2 border-black bg-gradient-to-b from-white to-neutral-400"
	/>

	<div
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid text-center shadow-white"
	>
		<div class="text-3xl font-bold text-shadow-sm">INAZUMA</div>
		<Border />
		<div class="text-shadow-sm">Manga data in manga style</div>
	</div>
</div>
