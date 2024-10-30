<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchemaRecipe, type FormSchema } from './recipe';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';
	import { Plus, X } from 'lucide-svelte';
	import SuperDebug from 'sveltekit-superforms';
	const { data } = $props<{ data: SuperValidated<Infer<FormSchema>> }>();

	const form = superForm(data, {
		validators: zodClient(formSchemaRecipe),
		taintedMessage: null,
		onSubmit: ({ formData, cancel }) => {
			console.log('Form data before submission:', Object.fromEntries(formData));
		},
		onResult: ({ result }) => {
			console.log('Form submission result:', result);
		}
	});

	const { form: formData, enhance } = form;

	let newIngredient = $state('');
	let newTag = $state('');
	let imagePreview: string | null = $state(null);
	let newInstruction = $state('');

	function addInstruction() {
		if (newInstruction.trim()) {
			$formData.instructions = [...($formData.instructions || []), newInstruction.trim()];
			newInstruction = '';
		}
	}

	function removeInstruction(index: number) {
		$formData.instructions = $formData.instructions.filter((_: any, i: number) => i !== index);
	}

	function addIngredient() {
		if (newIngredient.trim()) {
			$formData.ingredients = [...($formData.ingredients || []), newIngredient.trim()];
			newIngredient = '';
		}
	}

	function removeIngredient(index: number) {
		$formData.ingredients = $formData.ingredients.filter((_: any, i: number) => i !== index);
	}

	function addTag() {
		if (newTag.trim()) {
			$formData.tags = [...($formData.tags || []), newTag.trim()];
			newTag = '';
		}
	}

	function removeTag(index: number) {
		$formData.tags = $formData.tags?.filter((_: any, i: number) => i !== index);
	}
	let imagePreview: string | null = $state(null);
	function handleImageChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
			$formData.image = file;
		}
	}

	onMount(() => {
		if (typeof $formData.image === 'string' && $formData.image) {
			imagePreview = $formData.image;
		}
		$formData.name = 'Demo';
	});
</script>

<form
	method="POST"
	action="?/post"
	use:enhance
	enctype="multipart/form-data"
	class="bg-card mx-auto max-w-2xl rounded-lg border p-6 shadow-xl"
>
	<h2 class="mb-6 text-center text-2xl font-bold">Create New Recipe</h2>

	<div class="space-y-6">
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label class="text-text mb-1 block text-sm font-medium">Recipe Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} class="w-full" autocomplete="off" />
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		<Form.Field {form} name="tags">
			<Form.Control>
				<Form.Label class="mb-1 block text-sm font-medium">Tags</Form.Label>
				<div class="space-y-2">
					<div class="flex items-center space-x-2">
						<Input
							bind:value={newTag}
							on:keypress={(e) => e.key === 'Enter' && addTag()}
							placeholder="Add new tag"
							class="flex-grow"
							autocomplete="off"
						/>
						<Button type="button" on:click={addTag}><Plus /></Button>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each $formData.tags || [] as tag, index}
							<div class="bg-primary text-text flex items-center rounded-xl px-2 py-1 text-sm">
								{tag}
								<button type="button" onclick={() => removeTag(index)} class="ml-2 text-xs"
									><X size={12}></X></button
								>
							</div>
						{/each}
					</div>
				</div>
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		<Form.Field {form} name="description">
			<Form.Control let:attrs>
				<Form.Label class="mb-1 block text-sm font-medium">Description</Form.Label>
				<Textarea {...attrs} bind:value={$formData.description} class="h-14 w-full" />
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		<Form.Field {form} name="image">
			<Form.Control let:attrs>
				<Form.Label class="mb-1 block text-sm font-medium">Image</Form.Label>
				<Input
					{...attrs}
					id="image"
					type="file"
					accept="image/*"
					on:change={handleImageChange}
					class="w-full"
				/>
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		{#if imagePreview}
			<div class="mt-4">
				<img
					src={imagePreview}
					alt="Recipe preview"
					class="h-48 w-full rounded-lg object-cover shadow-md"
				/>
			</div>
		{/if}

		<Form.Field {form} name="ingredients">
			<Form.Control>
				<Form.Label class="mb-1 block text-sm font-medium">Ingredients</Form.Label>
				<div class="space-y-2">
					<div class="flex items-center space-x-2">
						<Input
							bind:value={newIngredient}
							on:keypress={(e) => e.key === 'Enter' && addIngredient()}
							placeholder="Add new ingredient"
							class="flex-grow"
							autocomplete="off"
						/>
						<Button type="button" on:click={addIngredient}><Plus /></Button>
					</div>
					<div class="Escribimos 2overflow-y-auto max-h-48">
						{#each $formData.ingredients || [] as ingredient, index}
							<div class="mb-2 flex items-center space-x-2">
								<Input value={ingredient} readonly class="flex-grow" />
								<Button variant="destructive" on:click={() => removeIngredient(index)}>
									<X />
								</Button>
							</div>
						{/each}
					</div>
				</div>
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		<Form.Field {form} name="instructions">
			<Form.Control>
				<Form.Label class="mb-1 block text-sm font-medium">Instructions</Form.Label>
				<div class="space-y-2">
					<div class="flex items-center space-x-2">
						<Input
							bind:value={newInstruction}
							on:keypress={(e) => e.key === 'Enter' && addInstruction()}
							placeholder="Add new ingredient"
							class="flex-grow"
							autocomplete="off"
						/>
						<Button on:click={addInstruction}><Plus /></Button>
					</div>
					<div class="max-h-48 overflow-y-auto">
						{#each $formData.instructions || [] as instruction, index}
							<div class="mb-2 flex items-center space-x-2">
								<Input
									value={index + 1 + '. ' + instruction}
									readonly
									disabled
									class="flex-grow focus:border-none"
								/>
								<Button variant="destructive" on:click={() => removeInstruction(index)}>
									<X />
								</Button>
							</div>
						{/each}
					</div>
				</div>
			</Form.Control>
			<Form.FieldErrors class="mt-1 text-sm text-red-500" />
		</Form.Field>

		<div class="grid grid-cols-3 gap-4">
			<Form.Field {form} name="fats">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Fats (g)</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.fats} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="proteins">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Proteins (g)</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.proteins} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="carbohydrates">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Carbohydrates (g)</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.carbohydrates} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="calories">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Calories (kcal)</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.calories} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="portions">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Portions</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.portions} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="estimate">
				<Form.Control let:attrs>
					<Form.Label class="mb-1 block text-sm font-medium">Estimate (min)</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.estimate} class="w-full" />
				</Form.Control>
				<Form.FieldErrors class="mt-1 text-sm text-red-500" />
			</Form.Field>
		</div>

		<Form.Button
			class="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 transition-colors"
		>
			Submit Recipe
		</Form.Button>
	</div>
</form>
<SuperDebug data={formData} />
