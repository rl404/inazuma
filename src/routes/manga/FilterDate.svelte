<script lang="ts">
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';
	import { DateInput } from 'date-picker-svelte';

	export let label: string;
	export let value: Date | null;

	const onReset = () => {
		value = null;
	};
</script>

<div class="grid">
	<div class="text-neutral-400">{label}</div>
	<div class="relative">
		<DateInput
			bind:value
			placeholder="date"
			format="yyyy-MM-dd"
			closeOnSelection
			class="[&>input]:!w-full [&>input]:h-[22px] [&>input]:bg-white [&>input]:dark:bg-neutral-600 [&>input]:!border-none focus:[&>input]:!shadow-none [&>.picker]:right-0"
		/>

		{#if value != null}
			<div
				class="z-10 absolute inset-y-0 right-0 flex items-center pr-1 hover:text-red-500 cursor-pointer"
				title="clear"
				on:click={onReset}
			>
				<XmarkIcon class="w-3 h-3" />
			</div>
		{/if}
	</div>
</div>
