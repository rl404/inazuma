<script lang="ts">
	import { page } from '$app/stores';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';

	const status: number = $page.status;
	const message: string = $page.error?.message || '';
</script>

<Head title={status.toString()} description={message} />

<PortraitPage>
	<div class="flex h-full w-full items-center justify-center">
		<div class="grid gap-2 font-bold">
			<h1 class="text-center text-8xl">{status}</h1>
			<Border>
				<span class="whitespace-nowrap px-4">
					{message}
				</span>
			</Border>
		</div>
	</div>
</PortraitPage>
