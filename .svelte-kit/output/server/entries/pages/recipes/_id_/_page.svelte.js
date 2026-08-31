import { g as escape_html, h as attr, n as ensure_array_like, t as derived } from "../../../../chunks/server.js";
import { t as appState } from "../../../../chunks/app-state.js";
//#region src/routes/recipes/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { data } = $$props;
		const recipe = derived(() => data.recipe);
		const isFavorite = derived(() => recipe() ? appState.isFavorite(recipe().id) : false);
		if (recipe()) {
			$$renderer.push(`<!--[0--><section><h1>${escape_html(recipe().name)}</h1> <img${attr("src", recipe().image)}${attr("alt", recipe().name)} style="max-width: 100%; height: auto;"/> <p>Category: ${escape_html(recipe().category ?? "Unknown")}</p> <p>Area: ${escape_html(recipe().area ?? "Unknown")}</p> <favorite-button${attr("active", isFavorite())}></favorite-button> <h2>Ingredients</h2> <ul><!--[-->`);
			const each_array = ensure_array_like(recipe().ingredients);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let ingredient = each_array[$$index];
				$$renderer.push(`<li>${escape_html(ingredient.name)}${escape_html(ingredient.measure ? ` - ${ingredient.measure}` : "")}</li>`);
			}
			$$renderer.push(`<!--]--></ul> `);
			if (recipe().instructions) $$renderer.push(`<!--[0--><h2>Instructions</h2> <p>${escape_html(recipe().instructions)}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (recipe().tags?.length) $$renderer.push(`<!--[0--><p>Tags: ${escape_html(recipe().tags.join(", "))}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (recipe().youtube) $$renderer.push(`<!--[0--><p><a${attr("href", recipe().youtube)} target="_blank" rel="noreferrer">Watch on YouTube</a></p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></section>`);
		} else $$renderer.push(`<!--[-1--><p>No recipe found.</p>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
