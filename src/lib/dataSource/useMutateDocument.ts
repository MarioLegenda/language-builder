import { updateDoc } from '@firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';
import { getDocRef } from '@/lib/dataSource/firebase/getDocRef';
import { useDocumentMutator } from '@/lib/dataSource/firebase/useDocumentMutator';
import type { DocumentData } from '@firebase/firestore';

export function useMutateDocument<T extends DocumentData>(
	path: string,
	type: 'set' | 'add' | 'update' = 'set',
	update = false,
) {
	const queryClient = useQueryClient();
	const { set, add } = useDocumentMutator();

	const mutation = useMutation<void, unknown, FirestoreModel<T>>(async (model: FirestoreModel<T>) => {
		if (type === 'set' && model.segment) {
			await set(path, model.segment, model.model, update);
			return;
		}

		if (type === 'update' && model.segment) {
			await updateDoc(getDocRef(path, model.segment), model.model);
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
