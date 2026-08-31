import * as universal from '../entries/pages/recipes/_id_/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/recipes/_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/recipes/[id]/+page.ts";
export const imports = ["_app/immutable/nodes/5.u-FzjSNZ.js","_app/immutable/chunks/DHZyJosK.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BYfvPkul.js","_app/immutable/chunks/CwwgjiLH.js"];
export const stylesheets = [];
export const fonts = [];
