<script lang="ts">
	import type { Recipe } from '$lib/types';
	import type { PageData } from '../$types';
	import * as Card from '$lib/components/ui/card';
	export let data: PageData;
	let recipe: Recipe = data.recipe;
</script>

<div class="container mx-auto py-8">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-3xl font-bold">{recipe.name}</Card.Title>
					<Card.Description class="text-lg">{recipe.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<img
						src="http://localhost:9000/{recipe.image}"
						alt={recipe.name}
						class="w-full max-h-96 object-cover rounded-lg"
					/>
					<div class="space-y-6">
						<div>
							<h3 class="mb-2 text-xl font-semibold">Ingredients</h3>
							<ul class="list-inside list-disc space-y-1">
								{#if recipe.ingredients}
									{#each recipe.ingredients as ingredient}
										<li>{ingredient}</li>
									{/each}
								{/if}
							</ul>
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold">Instructions</h3>
							<ol class="list-inside list-decimal space-y-2">
								{recipe.instructions}
							</ol>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div> 
		<div class="lg:col-span-1">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl">Recipe Details</Card.Title>
				</Card.Header>
				<Card.Content>
                    <p>{recipe.estimate} Minutes</p>
                    <p>{recipe.calories} Kcal</p>
                    <p>{recipe.proteins} </p>
                    <p>{recipe.carbohyrdrates}</p>
                    <p>{recipe.fats}</p>
                </Card.Content>
			</Card.Root>
		</div> 
	</div>
</div>
