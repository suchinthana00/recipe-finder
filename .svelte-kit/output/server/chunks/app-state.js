import "./server.js";
//#region src/lib/stores/app-state.svelte.ts
var FAVORITES_KEY = "recipe-favorites";
var MEAL_PLAN_KEY = "recipe-meal-plan";
function createEmptyMealPlan() {
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
var AppState = class {
	favorites = {};
	mealPlan = createEmptyMealPlan();
	constructor() {}
	get favoriteRecipes() {
		return Object.values(this.favorites);
	}
	isFavorite(id) {
		return Boolean(this.favorites[id]);
	}
	toggleFavorite(recipe) {
		if (this.favorites[recipe.id]) delete this.favorites[recipe.id];
		else this.favorites[recipe.id] = recipe;
		this.persist();
	}
	assignMeal(day, recipe) {
		this.mealPlan[day] = {
			id: recipe.id,
			name: recipe.name,
			image: recipe.image
		};
		this.persist();
	}
	removeMeal(day) {
		this.mealPlan[day] = null;
		this.persist();
	}
	hydrate() {
		try {
			const favorites = localStorage.getItem(FAVORITES_KEY);
			const mealPlan = localStorage.getItem(MEAL_PLAN_KEY);
			if (favorites) this.favorites = JSON.parse(favorites);
			if (mealPlan) this.mealPlan = {
				...createEmptyMealPlan(),
				...JSON.parse(mealPlan)
			};
		} catch {
			this.favorites = {};
			this.mealPlan = createEmptyMealPlan();
		}
	}
	persist() {}
};
var appState = new AppState();
//#endregion
export { appState as t };
