import { useCallback, useState } from 'react';
import { LanguageStore } from '@/lib/dataSource/language';

export function useLanguage() {
	const [store] = useState<DataSource<Language>>(LanguageStore);
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
