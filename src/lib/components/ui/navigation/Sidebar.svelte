<script lang="ts">
	import { Button} from '$lib/components/ui/button/index.js';
	import { Plus, Search, Home } from 'lucide-svelte';
</script>

<div class="bg-secondary flex h-svh flex-col justify-center">
    <Button variant="outline" href="/" class="m-3" size="icon"><Home /></Button>
	<Button variant="outline" href="/recipe/new" class="m-3" size="icon"><Plus /></Button>
	<Button variant="outline" class="m-3" size="icon"><Search /></Button>
</div> 
