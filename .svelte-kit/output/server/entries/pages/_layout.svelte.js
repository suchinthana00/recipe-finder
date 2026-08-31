import "../../chunks/index-server.js";
import "../../chunks/server.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { children } = $$props;
		$$renderer.push(`<nav class="nav svelte-12qhfyh"><a href="/">Home</a> <a href="/favorites">Favorites</a> <a href="/meal-plan">Meal Plan</a></nav> <main class="content svelte-12qhfyh">`);
		children?.($$renderer);
		$$renderer.push(`<!----></main>`);
	});
}
//#endregion
export { _layout as default };
