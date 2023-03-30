import { useCallback, useState } from 'react';
import { DeckStore } from '@/lib/dataSource/deck';

export function useDeck() {
	const [store] = useState<DataSource<Deck>>(DeckStore);
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
