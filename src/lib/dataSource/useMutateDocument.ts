import { useMutation, useQueryClient } from 'react-query';
import { useDocumentMutator } from '@/lib/dataSource/firebase';
import type { DocumentData } from '@firebase/firestore';

export function useMutateDocument<T extends DocumentData>(path: string, update = false) {
	const queryClient = useQueryClient();
	const mutate = useDocumentMutator();

	const mutation = useMutation<void, unknown, FirestoreModel<T>>(
		async (model: FirestoreModel<T>) => await mutate(path, model.segment, model.model, update),
	);

	return {
		...mutation,
		invalidateRelated: async (query: string | string[]) => {
			await queryClient.invalidateQueries(query);
		},
	};
}
