<script lang="ts">
	import type { Recipe } from '$lib/types';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge/index.js';
	export let data: PageData;
	let recipes: Recipe[] = data.recipes;
	console.log(recipes)
</script>

<div class="container mx-auto py-8">
	<h1 class="mb-6 text-3xl font-bold">Recipes</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each recipes as recipe}
			<a href={`/recipe/view?id=${recipe.id}`}>
				<Card.Root class="overflow-hidden">
					<Card.Header>
						<Card.Title class="text-xl">{recipe.name}</Card.Title>
					</Card.Header>
					<img
						src={`http://localhost:9000/${recipe.image}`}
						alt={recipe.name}
						class="h-48 w-full object-cover"
					/>
					<Card.Content class="mt-4">
						<div class="grid gap-y-2">
							<div class="grid grid-cols-5 gap-2">
								{#each recipe.tags as tag}
									<Badge class="bg-green-700">{tag}</Badge>
								{/each}
							</div>
							<p>{recipe.description}</p>
						</div>
					</Card.Content>
					<Card.Footer></Card.Footer>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
