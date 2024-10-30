// +page.server.ts
import { GetRecipes } from "$lib/server/db";
import type { Recipe } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const recipes: Recipe[] = await GetRecipes();
    return { recipes };
};
