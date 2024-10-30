<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Plus, Trash } from 'lucide-svelte';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: SuperValidated<Infer<FormSchema>>;
	const form = superForm(data, {
		validators: zodClient(formSchema),
		onResult(event) {
			const status: number = event.result.status || 0;
			if (status === 200) {
				toast('Recipe created');
                imagePreview = null
			} else {
				toast('Error creating Recipe');
			}
		}
	});
	const { form: formData, enhance } = form;

	let newTag = '';
    let newIngredient = ''
    let newInstruction = ''
	let imagePreview: string | null = null;

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

	function addTag() {
		$formData.tags = [newTag, ...$formData.tags];
		newTag = '';
	}

	function removeTag(index: number) {
		$formData.tags = $formData.tags.filter((_, i) => i !== index);
	}

    function addInstruction() {
		$formData.instructions = [newInstruction, ...$formData.instructions];
		newInstruction = '';
	}

	function removeInstruction(index: number) {
		$formData.instructions = $formData.instructions.filter((_, i) => i !== index);
	}
	
    function addIngredient() {
		$formData.ingredients = [newIngredient, ...$formData.ingredients];
		newIngredient = '';
	}

	function removeIngredient(index: number) {
		$formData.ingredients = $formData.ingredients.filter((_, i) => i !== index);
	}
	

</script>

<form
	method="POST"
	action="?/post"
    enctype="multipart/form-data"
	use:enhance
	class="bg-card mx-auto max-w-2xl space-y-6 rounded-lg border p-6 shadow-xl"
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} autocomplete="off"/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Image</Form.Label>
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

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} class="w-full" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Tags</Form.Label>
			<div class="flex gap-2">
				<Input {...attrs} bind:value={newTag} autocomplete="off" />
				<Button size="icon" on:click={addTag}>
					<Plus />
				</Button>
			</div>
			<div class="grid grid-cols-1 space-y-2">
				{#each $formData.tags as tag, index}
					<div class="flex gap-2">
						<Input {...attrs} bind:value={$formData.tags[index]} autocomplete="off" />
						<Button size="icon" variant="destructive" on:click={() => removeTag(index)}>
							<Trash />
						</Button>
					</div>
				{/each}
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

    <Form.Field {form} name="ingredients">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Ingredients</Form.Label>
			<div class="flex gap-2">
				<Input {...attrs} bind:value={newIngredient} />
				<Button size="icon" on:click={addIngredient}>
					<Plus />
				</Button>
			</div>
			<div class="grid grid-cols-1 space-y-2">
				{#each $formData.ingredients as ingredient, index}
					<div class="flex gap-2">
						<Input {...attrs} bind:value={$formData.ingredients[index]} />
						<Button size="icon" variant="destructive" on:click={() => removeIngredient(index)}>
							<Trash />
						</Button>
					</div>
				{/each}
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>


    <Form.Field {form} name="instructions">
		<Form.Control let:attrs>
			<Form.Label class="text-xl">Instructions</Form.Label>
			<div class="flex gap-2">
				<Input {...attrs} bind:value={newInstruction} autocomplete="off"/>
				<Button size="icon" on:click={addInstruction}>
					<Plus />
				</Button>
			</div>
			<div class="grid grid-cols-1 space-y-2">
				{#each $formData.instructions as instruction, index}
					<div class="flex gap-2">
						<Input {...attrs} bind:value={$formData.instructions[index]} />
						<Button size="icon" variant="destructive" on:click={() => removeInstruction(index)}>
							<Trash />
						</Button>
					</div>
				{/each}
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="grid grid-cols-3 gap-4">
		<Form.Field {form} name="fats">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Fats (g)</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.fats} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="proteins">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Proteins (g)</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.proteins} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="carbohydrates">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Carbohydrates (g)</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.carbohydrates} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="calories">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Calories (kcal)</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.calories} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="portions">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Portions</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.portions} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="estimate">
			<Form.Control let:attrs>
				<Form.Label class="text-xl">Estimate (min)</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.estimate} class="w-full" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Button class="w-full">Submit</Form.Button>
</form>

<!-- <SuperDebug data={$formData} /> -->
