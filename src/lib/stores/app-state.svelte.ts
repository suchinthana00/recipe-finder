import { browser } from '$app/environment';
import type { Recipe } from '$lib/types/recipe';

export type MealPlanDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type PlannedMeal = {
  id: string;
  name: string;
  image: string;
};

type MealPlan = Record<MealPlanDay, PlannedMeal | null>;

const FAVORITES_KEY = 'recipe-favorites';
const MEAL_PLAN_KEY = 'recipe-meal-plan';

function createEmptyMealPlan(): MealPlan {
  return {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null
  };
}

class AppState {
  favorites = $state<Record<string, Recipe>>({});
  mealPlan = $state<MealPlan>(createEmptyMealPlan());

  constructor() {
    if (browser) {
      this.hydrate();
    }
  }

  get favoriteRecipes(): Recipe[] {
    return Object.values(this.favorites);
  }

  isFavorite(id: string): boolean {
    return Boolean(this.favorites[id]);
  }

  toggleFavorite(recipe: Recipe): void {
    if (this.favorites[recipe.id]) {
      delete this.favorites[recipe.id];
    } else {
      this.favorites[recipe.id] = recipe;
    }

    this.persist();
  }

  assignMeal(day: MealPlanDay, recipe: Recipe): void {
    this.mealPlan[day] = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image
    };

    this.persist();
  }

  removeMeal(day: MealPlanDay): void {
    this.mealPlan[day] = null;
    this.persist();
  }

  private hydrate(): void {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      const mealPlan = localStorage.getItem(MEAL_PLAN_KEY);

      if (favorites) {
        this.favorites = JSON.parse(favorites) as Record<string, Recipe>;
      }

      if (mealPlan) {
        this.mealPlan = {
          ...createEmptyMealPlan(),
          ...(JSON.parse(mealPlan) as Partial<MealPlan>)
        };
      }
    } catch {
      this.favorites = {};
      this.mealPlan = createEmptyMealPlan();
    }
  }

  private persist(): void {
    if (!browser) {
      return;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites));
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(this.mealPlan));
  }
}

export const appState = new AppState();
