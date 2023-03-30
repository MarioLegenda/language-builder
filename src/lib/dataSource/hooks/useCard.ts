import { useCallback, useState } from 'react';
import { CardStore } from '@/lib/dataSource/cards';

export function useCard() {
	const [store] = useState<DataSource<Card>>(CardStore);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRender] = useState<boolean>(false);

	const persist = useCallback(() => {
		if (store) {
			store.persist();
			setRender((a) => !a);
		}
	}, [store]);

	return {
		store,
		persist,
	};
}
