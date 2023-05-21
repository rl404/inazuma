<script lang="ts">
	import { page } from '$app/stores';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';

	const status: number = $page.status;
	const message: string = $page.error?.message || '';
</script>

<Head title={status.toString()} description={message} />

<PortraitPage>
	<div class="flex items-center justify-center h-full">
		<div class="grid gap-2">
			<div class="text-9xl text-center">{status}</div>
			<Border><span class="px-4 whitespace-nowrap">{message}</span></Border>
		</div>
	</div>
</PortraitPage>
