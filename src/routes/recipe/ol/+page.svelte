<script lang="ts">
    import type { PageData } from "../$types.js";
    import NewRecipe from "./NewRecipe.svelte";
    export let data: PageData;
</script>

<NewRecipe data={data.form} />
