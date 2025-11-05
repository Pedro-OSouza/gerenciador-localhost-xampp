import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/hub': {
				target: 'http://localhost', // aqui é onde roda o Apache/XAMPP
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
