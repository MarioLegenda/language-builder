import { doc, deleteDoc } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';
import {getFirestoreDB} from '@/lib/dataSource/firebase/firebase';
export const useDeleteDocument = () => {
	const db = getFirestoreDB();
	const queryClient = useQueryClient();

	const mutation = useMutation<void, unknown, DeleteDocument>(
		async (model: DeleteDocument) => await deleteDoc(doc(db, model.path, model.segment)),
	);

	return {
		...mutation,
		invalidateRelated: (query: string | string[]) => queryClient.invalidateQueries(query),
	};
};
