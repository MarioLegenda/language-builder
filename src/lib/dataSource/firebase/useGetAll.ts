import { collection, getDocs } from '@firebase/firestore';
import { getFirestoreDB } from '@/lib/dataSource/firebase/firebase';
import type { DocumentData, QuerySnapshot } from '@firebase/firestore';

export function useGetAll<T extends DocumentData>() {
	return async (path: string, segment?: string) => {
		let snapshot: QuerySnapshot<DocumentData, DocumentData>;

		if (segment) {
			snapshot = await getDocs(collection(getFirestoreDB(), path, segment));
		} else {
			snapshot = await getDocs(collection(getFirestoreDB(), path));
		}

		const data: T[] = [];
		snapshot.forEach((doc) => {
			data.push({
				id: doc.id,
				...(doc.data() as T),
			});
		});

		return data;
	};
}
