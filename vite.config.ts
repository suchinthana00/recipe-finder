import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['stencilrecipe', 'stencilrecipe/loader']
	},
	plugins: [sveltekit()]
});
