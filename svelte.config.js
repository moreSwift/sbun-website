import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			// The DocC site is deployed alongside this one by the update-docs workflow.
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/documentation')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
