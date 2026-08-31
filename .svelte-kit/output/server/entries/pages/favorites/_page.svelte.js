import { h as attr, t as derived } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { t as appState } from "../../../chunks/app-state.js";
//#region src/routes/favorites/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const recipes = derived(() => appState.favoriteRecipes.map((recipe) => ({
			id: recipe.id,
			name: recipe.name,
			image: recipe.image,
			category: recipe.category,
			isFavorite: true
		})));
		$$renderer.push(`<section><h1>Favorites</h1> `);
		if (recipes().length === 0) $$renderer.push(`<!--[0--><p>No recipes found.</p>`);
		else $$renderer.push(`<!--[-1--><recipe-feed${attr("recipes", recipes())}${attr("columns", 2)} gap="1rem"></recipe-feed>`);
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
export { _page as default };
