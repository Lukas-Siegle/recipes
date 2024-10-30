import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { db } from "$lib/server/db.js";
import { UploadImage } from "$lib/server/s3.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  post: async (event) => {
    const formData = await event.request.formData();

    const form = await superValidate(formData, zod(formSchema));
    console.log("Received form data:", form.data);

    if (!form.valid) {
        return fail(500, { message: "Form not valid" });
    }

    try {
      let path: string | null = null;
      if (form.data.image instanceof File) {
        path = await UploadImage(form.data.image);
      }

      const query = `
        INSERT INTO recipes (name, description, ingredients, instructions, tags, image, proteins, fats, carbohydrates, calories, estimate, portions) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      const values = [
        form.data.name, 
        form.data.description, 
        `{${form.data.ingredients.filter(item => item).join(',')}}`, // Filter out empty strings
        `{${form.data.instructions.filter(item => item).join(',')}}`, 
        `{${form.data.tags.filter(item => item).join(',')}}`, 
        path,
        form.data.proteins,
        form.data.fats,
        form.data.carbohydrates,
        form.data.calories,
        form.data.estimate,
        form.data.portions
    ];
    

      await db.query(query, values);

      const { image, ...formDataWithoutImage } = form.data;
      return { form: { ...form, data: formDataWithoutImage } };

    } catch (e) {
      console.log(e)
      return fail(500, { message: "Error inserting recipe" });
    }
  }
};