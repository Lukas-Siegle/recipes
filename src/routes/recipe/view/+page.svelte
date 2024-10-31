<script lang="ts">
	import type { Recipe } from '$lib/types';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Edit, Share, Trash, Download } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	export let data: PageData;
	let recipe: Recipe | null = data.recipe;
	let id: string | null = data.id;
	
	async function deleteRecipe() {
        try {
            const response = await fetch(`/recipe/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast("Deleted recipe")
				goto("/")
            } else {
				toast("Error deleting recipe")
			}

            const result = await response.json();
            console.log('Delete successful:', result);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }
</script>

<div class="container mx-auto py-8" id="main-content">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-3xl font-bold">{recipe?.name}</Card.Title>
					<Card.Description class="text-lg">{recipe?.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<img
						src="http://localhost:9000/{recipe?.image}"
						alt={recipe?.name}
						class="max-h-96 w-full rounded-lg object-cover"
					/>
					<div>
						<Card.Title class="mb-4 mt-4 text-3xl font-bold">Instructions</Card.Title>
						{#if recipe?.instructions}
							{#each recipe?.instructions.reverse() as instruction, index}
								<div class="flex flex-row">
									<span class="font bold text-xl">{index + 1}.&nbsp;</span>
									<p class="text-xl">{instruction}</p>
								</div>
								<hr class="mb-2 mt-2" />
							{/each}
						{/if}
					</div>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="lg:col-span-1">
			<Card.Root>
				<Card.Content>
					<Card.Title class="text-2xl">Recipe Details</Card.Title>
					<p>Estimated preperation time: {recipe?.estimate}m</p>
					<Card.Title class="mt-4 text-xl">Nutrients</Card.Title>
					<p class="font-bold">{recipe?.calories} Kcal</p>
					<p>{recipe?.proteins}g Protein</p>
					<p>{recipe?.carbohydrates}g Carbohydrates</p>
					<p>{recipe?.fats}g Fats</p>
					<Card.Title class="mt-4 text-xl">Ingredients</Card.Title>
					<div class="space-y-6">
						<div>
							<ul class="list-inside list-disc space-y-1">
								{#if recipe?.ingredients}
									{#each recipe?.ingredients as ingredient}
										<li>{ingredient}</li>
									{/each}
								{/if}
							</ul>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
			<div class="w-full gap-4 mt-4 flex flex-row">
				<Button size="icon"><Edit/></Button>
				<Button size="icon"><Download/></Button>
				<AlertDialog.Root>
					<AlertDialog.Trigger>
						<Button size="icon" variant="destructive">
							<Trash/>
						</Button>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Delete Recipe</AlertDialog.Title>
							<AlertDialog.Description>
								Are you sure you want to delete this recipe? This action cannot be undone.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action on:click={deleteRecipe} class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
								Delete
							</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		</div>
	</div>
</div>