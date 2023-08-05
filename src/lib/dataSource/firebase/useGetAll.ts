import {collection, getDocs, orderBy, query} from '@firebase/firestore';
import { getFirestoreDB } from '@/lib/dataSource/firebase/firebase';
import type { DocumentData, QuerySnapshot } from '@firebase/firestore';

export function useGetAll<T extends DocumentData>() {
	return async (path: string, segment?: string) => {
		let snapshot: QuerySnapshot<DocumentData, DocumentData>;

		if (segment) {
			snapshot = await getDocs(query(collection(getFirestoreDB(), path, segment), orderBy('createdAt', 'desc')));
		} else {
			snapshot = await getDocs(query(collection(getFirestoreDB(), path), orderBy('createdAt', 'desc')));
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
