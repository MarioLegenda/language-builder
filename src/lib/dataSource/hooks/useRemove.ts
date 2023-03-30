import { useCallback } from 'react';

export function useRemove<T>(store: DataSource<T>, onRemove: () => void) {
	return useCallback(
		(id: string) => {
			if (store) {
				store.remove(id);
				onRemove();
			}
		},
		[store, onRemove],
	);
}
