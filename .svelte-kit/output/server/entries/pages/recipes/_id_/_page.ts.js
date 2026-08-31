import { n as getRecipeById } from "../../../../chunks/themealdb.js";
//#region src/routes/recipes/[id]/+page.ts
var load = async ({ params }) => {
	return { recipe: await getRecipeById(params.id) };
};
//#endregion
export { load };
