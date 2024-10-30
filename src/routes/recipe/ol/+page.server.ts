import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchemaRecipe } from "./recipe";
import { db } from "$lib/server/db.js";
import { UploadImage } from "$lib/server/s3.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchemaRecipe)),
  };
};

export const actions: Actions = {
  post: async (event) => {
    const formData = await event.request.formData();
    
    // Parse JSON strings back into arrays
    const ingredients = JSON.parse(formData.get('ingredients') as string || '[]');
    const instructions = JSON.parse(formData.get('instructions') as string || '[]');
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    
    // Update formData with parsed arrays
    formData.set('ingredients', ingredients);
    formData.set('instructions', instructions);
    formData.set('tags', tags);

    const form = await superValidate(formData, zod(formSchemaRecipe));
    console.log("Received form data:", form.data);

    if (!form.valid) {
      console.log("Validation errors:", form.errors);
      return fail(400, { form });
    }

    try {
      let path: string | null = null;
      if (form.data.image instanceof File) {
        path = await UploadImage(form.data.image);
      }

      const query = `
        INSERT INTO recipes (name, description, ingredients, instructions, image, tags, proteins, fats, carbohydrates, calories, estimate, portions) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      const values = [
        form.data.name, 
        form.data.description, 
        JSON.stringify(form.data.ingredients), 
        JSON.stringify(form.data.instructions), 
        path,
        JSON.stringify(form.data.tags),
        form.data.proteins,
        form.data.fats,
        form.data.carbohydrates,
        form.data.calories,
        form.data.estimate,
        form.data.portions
      ];

      await db.query(query, values);
      console.log("Recipe added successfully");

      // Remove the image from the form data before returning
      const { image, ...formDataWithoutImage } = form.data;
      return { form: { ...form, data: formDataWithoutImage } };

    } catch (e) {
      console.error("Error inserting recipe:", e);
      return fail(500, { form, message: "Error inserting recipe" });
    }
  }
};