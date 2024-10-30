<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$lib/components/ui/navigation/Sidebar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Moon, Sun } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex flex-row">
	<Sidebar />
	<ScrollArea class="w-full max-h-screen overflow-y-auto pt-10"> 
		{@render children()}
	</ScrollArea>
</div>

<div class="absolute bottom-5 right-5">
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>
<Toaster />