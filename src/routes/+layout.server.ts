import { GetNames, GetTags } from "$lib/server/db";
import type { Recipe } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
    const names: String[] = await GetNames();
    const tags: String[] = await GetTags();
    return { names, tags };
};
