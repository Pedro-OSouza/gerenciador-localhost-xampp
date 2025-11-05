import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Aqui definimos o diretório final do build
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html'
		}),
		paths: {
			base: '/hub/frontend/dist',
			relative: false
		}
	}
};

export default config;
