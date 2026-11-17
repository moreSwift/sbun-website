import { execFileSync } from 'node:child_process';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function resolveCommit(): string {
	const fromEnv = process.env.PUBLIC_SBUN_COMMIT;
	if (fromEnv) return fromEnv.slice(0, 7);

	const repo = process.env.SBUN_REPO ?? path.resolve(process.cwd(), '../../swift-bundler');
	for (const ref of ['main', 'HEAD']) {
		try {
			return execFileSync('git', ['rev-parse', '--short=7', ref], {
				cwd: repo,
				encoding: 'utf8'
			}).trim();
		} catch {
			// Try the next ref, then fall back to a readable placeholder.
		}
	}

	return 'DEV';
}

export default defineConfig({
	define: {
		__SBUN_COMMIT__: JSON.stringify(resolveCommit())
	},
	plugins: [tailwindcss(), sveltekit()]
});
