export function isBrowser() {
	if (typeof window === 'undefined') {
		return false;
	}

	return typeof window !== undefined;
}
