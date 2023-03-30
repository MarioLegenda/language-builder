import { useEffect, useState } from 'react';
import { useIsBrowser } from '@/lib/helpers/useIsBrowser';

export function useRunInBrowser() {
	const isInBrowser = useIsBrowser();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (isInBrowser) {
			setIsReady(true);
		}
	}, []);

	return isReady;
}
