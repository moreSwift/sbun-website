import { redirect } from '@sveltejs/kit';

// The docs live on their own site; this route just forwards visitors there.
export function load() {
	redirect(301, 'https://docs.swiftbundler.dev/documentation');
}
