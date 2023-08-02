import {collection, getDocs, limit, orderBy, query} from '@firebase/firestore';
import {getFirestoreDB} from '@/lib/dataSource/firebase/firebase';

export function useGetDocuments<T>(path: string) {
	const db = getFirestoreDB();

	return async (pageLimit = 15, pageOrderBy: OrderBy = { name: 'updatedAt', direction: 'desc' }): Promise<T[]> => {
		const q = query(collection(db, path), orderBy(pageOrderBy.name, pageOrderBy.direction), limit(pageLimit));
		const querySnapshot = await getDocs(q);
		const data: T[] = [];
		querySnapshot.forEach((doc) => {
			data.push({
				id: doc.id,
				...(doc.data() as T),
			});
		});

		return data;
	};
}