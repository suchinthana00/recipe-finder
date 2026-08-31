import type { HTMLAttributes } from 'svelte/elements';
import type { Recipe } from '$lib/types/recipe';

type FeedRecipe = Pick<Recipe, 'id' | 'name' | 'image' | 'category'> & { isFavorite?: boolean };

declare global {
  namespace App {}
}

declare namespace svelteHTML {
  interface IntrinsicElements {
    'recipe-search': HTMLAttributes<HTMLElement> & {
      placeholder?: string;
      value?: string;
      onsearchChanged?: (event: CustomEvent<string>) => void;
    };
    'recipe-filter': HTMLAttributes<HTMLElement> & {
      options?: string[];
      value?: string;
      onfilterChanged?: (event: CustomEvent<string>) => void;
    };
    'recipe-feed': HTMLAttributes<HTMLElement> & {
      recipes?: FeedRecipe[];
      columns?: number;
      gap?: string;
      onrecipeSelected?: (event: CustomEvent<string>) => void;
      onfavoriteToggled?: (event: CustomEvent<{ id: string; isFavorite: boolean }>) => void;
    };
    'favorite-button': HTMLAttributes<HTMLElement> & {
      active?: boolean;
      onfavoriteToggled?: (event: CustomEvent<boolean>) => void;
    };
    'meal-plan-day': HTMLAttributes<HTMLElement> & {
      day: string;
      recipeId?: string;
      recipeName?: string;
      recipeImage?: string;
      onmealSelected?: (event: CustomEvent<string>) => void;
      onmealRemoved?: (event: CustomEvent<string>) => void;
    };
  }
}

export {};
