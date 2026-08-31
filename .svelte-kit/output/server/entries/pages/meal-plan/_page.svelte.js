import { g as escape_html, h as attr, n as ensure_array_like, t as derived } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { t as appState } from "../../../chunks/app-state.js";
//#region src/routes/meal-plan/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const days = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday"
		];
		const favoriteRecipes = derived(() => appState.favoriteRecipes);
		let selectedRecipeIds = {
			Monday: "",
			Tuesday: "",
			Wednesday: "",
			Thursday: "",
			Friday: "",
			Saturday: "",
			Sunday: ""
		};
		$$renderer.push(`<section><h1>Meal Plan</h1> `);
		if (favoriteRecipes().length === 0) $$renderer.push(`<!--[0--><p>No recipes found.</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array = ensure_array_like(days);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let day = each_array[$$index_1];
			$$renderer.push(`<div class="day-block svelte-1bawcm6"><h2>${escape_html(day)}</h2> <meal-plan-day${attr("day", day)}${attr("recipeid", appState.mealPlan[day]?.id)}${attr("recipename", appState.mealPlan[day]?.name)}${attr("recipeimage", appState.mealPlan[day]?.image)}></meal-plan-day> `);
			if (favoriteRecipes().length > 0) {
				$$renderer.push(`<!--[0--><div class="controls svelte-1bawcm6">`);
				$$renderer.select({ value: selectedRecipeIds[day] }, ($$renderer) => {
					$$renderer.option({ value: "" }, ($$renderer) => {
						$$renderer.push(`Select a favorite`);
					});
					$$renderer.push(`<!--[-->`);
					const each_array_1 = ensure_array_like(favoriteRecipes());
					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
						let recipe = each_array_1[$$index];
						$$renderer.option({ value: recipe.id }, ($$renderer) => {
							$$renderer.push(`${escape_html(recipe.name)}`);
						});
					}
					$$renderer.push(`<!--]-->`);
				});
				$$renderer.push(` <button${attr("disabled", !selectedRecipeIds[day], true)}>Assign</button></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
export { _page as default };
