<script lang="ts">
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { DateInput } from 'date-picker-svelte';

	export let label: string;
	export let value: Date | null;

	const onReset = () => (value = null);
</script>

<div class="grid">
	<div>{label}</div>
	<div class="relative">
		<DateInput
			bind:value
			placeholder="date"
			format="yyyy-MM-dd"
			closeOnSelection
			class="[&>.picker]:right-0 [&>input]:h-[22px] [&>input]:!w-full [&>input]:!rounded-none [&>input]:!border [&>input]:!border-black [&>input]:bg-white focus:[&>input]:!shadow-none"
		/>
		{#if value != null}
			<button
				title="clear"
				class="absolute inset-y-0 right-1 z-10 text-red-500 hover:opacity-70"
				on:click={onReset}
			>
				<XmarkIcon class="h-3 w-3" />
			</button>
		{/if}
	</div>
</div>
