<script lang="ts">
	export let value: string;
</script>

<div class="grid">
	<div>NSFW</div>
	<select bind:value class="w-full border border-black bg-white p-1">
		<option value="">All</option>
		<option value="true">True</option>
		<option value="false">False</option>
	</select>
</div>
