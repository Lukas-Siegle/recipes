<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import * as Drawer from "$lib/components/ui/drawer"
	import { Search } from "lucide-svelte";
</script>

<Drawer.Root>
    <Drawer.Trigger >
        <Button variant="outline" class="m-3" size="icon"><Search /></Button>
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
            <Drawer.Description>This action cannot be undone.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
            <Button>Submit</Button>
            <Drawer.Close>Cancel</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>