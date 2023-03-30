import { useEffect, useRef } from 'react';

export function useOnce(fn: () => void) {
	const once = useRef(false);

	useEffect(() => {
		if (!once.current) {
			once.current = true;

			fn();
		}
	}, [once.current]);
}
