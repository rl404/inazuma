<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import NewRelease from './NewRelease.svelte';
</script>

<div class="grid gap-4">
	<div>0. Inazuma</div>
	<RenderIfVisible class="grid grid-cols-5 gap-1">
		<NewRelease />
	</RenderIfVisible>
</div>
