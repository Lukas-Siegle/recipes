import { GetRecipe} from "$lib/server/db";
import type { Recipe } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Extract the 'id' parameter from the query string

    if (id) {
        const recipe = await GetRecipe(parseInt(id));
        console.log(recipe)
        return { recipe }; 
    }

    return { recipe: null }; 
};