import type { Recipe } from '$lib/types/recipe';

type MealDBMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
};

const BASE = 'https://www.themealdb.com/api/json/v1/1';

function toIngredients(meal: MealDBMeal): Recipe['ingredients'] {
  const ingredients: Recipe['ingredients'] = [];

  for (let index = 1; index <= 20; index += 1) {
    const name = meal[`strIngredient${index}`]?.trim();
    const measure = meal[`strMeasure${index}`]?.trim() ?? '';

    if (name) {
      ingredients.push({ name, measure });
    }
  }

  return ingredients;
}

function toRecipe(meal: MealDBMeal): Recipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients: toIngredients(meal),
    tags: meal.strTags?.split(',').map((tag) => tag.trim()).filter(Boolean),
    youtube: meal.strYoutube
  };
}

async function request<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${BASE}${path}`);

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const data = await request<{ meals: MealDBMeal[] | null }>(`/search.php?s=${encodeURIComponent(query)}`);
  return data?.meals?.map(toRecipe) ?? [];
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const data = await request<{ meals: MealDBMeal[] | null }>(`/lookup.php?i=${encodeURIComponent(id)}`);
  const meal = data?.meals?.[0];
  return meal ? toRecipe(meal) : null;
}

export async function getCategories(): Promise<string[]> {
  const data = await request<{ meals: Array<{ strCategory: string }> | null }>(`/list.php?c=list`);
  return data?.meals?.map((meal) => meal.strCategory).filter(Boolean) ?? [];
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const data = await request<{ meals: Array<{ idMeal: string }> | null }>(`/filter.php?c=${encodeURIComponent(category)}`);
  const ids = data?.meals?.slice(0, 6).map((meal) => meal.idMeal) ?? [];
  const recipes = await Promise.all(ids.map((id) => getRecipeById(id)));
  return recipes.filter((recipe): recipe is Recipe => recipe !== null);
}

export async function getRandomRecipe(): Promise<Recipe | null> {
  const data = await request<{ meals: MealDBMeal[] | null }>('/random.php');
  const meal = data?.meals?.[0];
  return meal ? toRecipe(meal) : null;
}
