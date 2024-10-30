export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  image: string; 
  fats: number | undefined;
  proteins: number | undefined ;
  carbohydrates: number | undefined;
  estimate: number | undefined;
  calories: number | undefined;
  portions: number | undefined;
}
