// @ts-nocheck
import type { PageLoad } from './$types';
import { getRecipeById } from '$lib/api/themealdb';
import type { Recipe } from '$lib/types/recipe';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const recipe: Recipe | null = await getRecipeById(params.id);
  return { recipe };
};
