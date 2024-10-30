import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from "$env/static/private"
import type { Recipe } from "$lib/types";

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
  
export const db = await pool.connect()

export async function GetRecipe(id: number): Promise<Recipe | null> {
  try {
    const query = "SELECT * FROM recipes WHERE id = $1;";
    const values = [id];
    const result = await db.query(query, values);
    
    if (result.rows.length > 0) {
      const row = result.rows[0]; 
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        ingredients: row.ingredients,
        instructions: row.instructions,
        image: row.image,
        tags: row.tags,
        proteins: row.proteins,
        carbohydrates: row.carbohydrates,
        fats: row.fats,
        calories: row.calories,
        estimate: row.estimate,
        portions: row.portions

      };
    }
    
    return null; 
  } catch (e) {
    return null; 
  }
}


export async function GetRecipes(): Promise<Recipe[]> {
  try {
    const query = "SELECT id, name, description, fats, ingredients, tags, instructions, proteins, calories, carbohydrates, estimate, image FROM recipes;";
    const result = await db.query(query);
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      ingredients: row.ingredients,
      instructions: row.instructions,
      description: row.description,
      image: row.image,
      tags: row.tags,
      proteins: row.proteins,
      carbohydrates: row.carbohydrates,
      fats: row.fats,
      estimate: row.estimate,
      calories: row.calories,
      portions: row.portions,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}
