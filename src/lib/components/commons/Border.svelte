<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export { className as class };
	let className: string = '';
</script>

<div class={twMerge('inline-flex w-full items-center justify-center', className)}>
	<hr class="h-px w-full border-0 bg-neutral-200" />
	<slot />
	<hr class="h-px w-full border-0 bg-neutral-200" />
</div>
