export function isDevEnvironment() {
	return process.env.NEXT_PUBLIC_APP_ENV === 'dev';
}
