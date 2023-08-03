import {collection, getDocs} from '@firebase/firestore';
import {getFirestoreDB, useFirestore} from '@/lib/dataSource/firebase/firebase';
import type { DocumentData } from '@firebase/firestore';

export function useGetAll<T extends DocumentData>() {
	return async (path: string) => {
		const snapshot = await getDocs(collection(getFirestoreDB(), path));

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
