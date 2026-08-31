import "../../chunks/index-server.js";
import { h as attr, t as derived } from "../../chunks/server.js";
import "../../chunks/navigation.js";
import "../../chunks/themealdb.js";
import { t as appState } from "../../chunks/app-state.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let recipes = [];
		let categories = [];
		let selectedCategory = "";
		let searchValue = "";
		derived(() => recipes.map((recipe) => ({
			id: recipe.id,
			name: recipe.name,
			image: recipe.image,
			category: recipe.category,
			isFavorite: appState.isFavorite(recipe.id)
		})));
		$$renderer.push(`<section><h1>Recipe Finder</h1> <recipe-search placeholder="Search recipes..."${attr("value", searchValue)}></recipe-search> <recipe-filter${attr("options", categories)}${attr("value", selectedCategory)}></recipe-filter> <p><button>Surprise Me</button></p> `);
		$$renderer.push(`<!--[0--><p>Loading...</p>`);
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
export { _page as default };
