import { useMutation, useQueryClient } from 'react-query';
import { useDocumentMutator } from '@/lib/dataSource/firebase';
import type { DocumentData } from '@firebase/firestore';

export function useMutateDocument<T extends DocumentData>(path: string, type: 'set' | 'add' = 'set', update = false) {
	const queryClient = useQueryClient();
	const { set, add } = useDocumentMutator();

	const mutation = useMutation<void, unknown, FirestoreModel<T>>(async (model: FirestoreModel<T>) => {
		if (type === 'set') {
			await set(path, model.segment, model.model, update);
			return;
		}

		await add(path, model.model);
	});

	return {
		...mutation,
		invalidateRelated: async (query: string | string[]) => {
			await queryClient.invalidateQueries(query);
		},
	};
}
