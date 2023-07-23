import { doc, deleteDoc } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';
import { useFirestore } from '@/lib/dataSource/firebase';
export const useDeleteDocument = () => {
	const db = useFirestore();
	const queryClient = useQueryClient();

	const mutation = useMutation<void, unknown, DeleteDocument>(
		async (model: DeleteDocument) => await deleteDoc(doc(db, model.path, model.segment)),
	);

	return {
		...mutation,
		invalidateRelated: (query: string | string[]) => queryClient.invalidateQueries(query),
	};
};
