//#region src/lib/api/themealdb.ts
var BASE = "https://www.themealdb.com/api/json/v1/1";
function toIngredients(meal) {
	const ingredients = [];
	for (let index = 1; index <= 20; index += 1) {
		const name = meal[`strIngredient${index}`]?.trim();
		const measure = meal[`strMeasure${index}`]?.trim() ?? "";
		if (name) ingredients.push({
			name,
			measure
		});
	}
	return ingredients;
}
function toRecipe(meal) {
	return {
		id: meal.idMeal,
		name: meal.strMeal,
		image: meal.strMealThumb,
		category: meal.strCategory,
		area: meal.strArea,
		instructions: meal.strInstructions,
		ingredients: toIngredients(meal),
		tags: meal.strTags?.split(",").map((tag) => tag.trim()).filter(Boolean),
		youtube: meal.strYoutube
	};
}
async function request(path) {
	try {
		const response = await fetch(`${BASE}${path}`);
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
}
async function getRecipeById(id) {
	const meal = (await request(`/lookup.php?i=${encodeURIComponent(id)}`))?.meals?.[0];
	return meal ? toRecipe(meal) : null;
}
async function getCategories() {
	return (await request(`/list.php?c=list`))?.meals?.map((meal) => meal.strCategory).filter(Boolean) ?? [];
}
async function getRecipesByCategory(category) {
	const ids = (await request(`/filter.php?c=${encodeURIComponent(category)}`))?.meals?.slice(0, 6).map((meal) => meal.idMeal) ?? [];
	return (await Promise.all(ids.map((id) => getRecipeById(id)))).filter((recipe) => recipe !== null);
}
//#endregion
export { getRecipeById as n, getRecipesByCategory as r, getCategories as t };
