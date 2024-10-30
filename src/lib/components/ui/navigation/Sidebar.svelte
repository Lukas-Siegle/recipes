<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Plus, Search, Home, X } from 'lucide-svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export const { tags, names } = $props();

	function navigateTo(url: string) {
		scrollTo({ top: 0, behavior: 'instant' });
		goto(url);
	}
</script>

<div class="flex h-svh flex-col justify-center bg-secondary">
	<Button variant="outline" on:click={() => navigateTo('/')} class="m-3" size="icon"
		><Home /></Button
	>
	<Button variant="outline" on:click={() => navigateTo('/recipe/new')} class="m-3" size="icon"
		><Plus /></Button
	>
	<Drawer.Root>
		<Drawer.Trigger>
			<Button variant="outline" class="m-3" size="icon"><Search /></Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Search</Drawer.Title>
			</Drawer.Header>
			<div class="m-auto grid grid-cols-4 gap-2">
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="tags">Tag</Label>
					<Input type="tags" id="tags" placeholder="tag" />
				</div>
			</div>
			<Drawer.Footer class="flex w-full flex-row justify-center gap-8">
				<Drawer.Close>
					<Button variant="destructive"><X class="mr-2 h-4 w-4" />Cancel</Button>
				</Drawer.Close>
				<Button><Search class="mr-2 h-4 w-4" />Search</Button>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
