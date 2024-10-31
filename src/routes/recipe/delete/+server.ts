import { DeleteRecipe } from "$lib/server/db";
import { json } from "@sveltejs/kit"

export async function DELETE(event: any) {
    const id = event.url.searchParams.get('id'); 
    try {
        await DeleteRecipe(id)
        return json({status: 200, ok: true})
    } catch (e) {
        return json({status: 500, ok: false})
    }
}