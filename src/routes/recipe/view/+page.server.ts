import { DeleteRecipe, GetRecipe} from "$lib/server/db";
import type { Recipe } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";

let id: string | null;

export const load: PageServerLoad = async ({ request }) => {
    const url = new URL(request.url);
    id = url.searchParams.get('id'); // Extract the 'id' parameter from the query string

    if (id) {
        const recipe = await GetRecipe(parseInt(id));
        return { recipe, id }; 
    }

    return { recipe: null, id: null }; 
};

