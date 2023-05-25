<script lang="ts">
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';
	import NewRelease from './NewRelease.svelte';
</script>

<div class="p-5 grid grid-cols-12 gap-1">
	<div class="col-span-12 text-xs md:text-sm lg:text-base">0. Inazuma</div>
	<RenderIfVisible class="col-span-12">
		<NewRelease />
	</RenderIfVisible>
</div>
