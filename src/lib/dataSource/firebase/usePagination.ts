import {
	collection,
	getDocs,
	limit,
	orderBy,
	query, startAfter
} from '@firebase/firestore';
import {useRef} from 'react';
import {getFirestoreDB} from '@/lib/dataSource/firebase/firebase';
import type {
	DocumentData,
	Query,
	QueryDocumentSnapshot
} from '@firebase/firestore';

export function usePagination<T>(path: string) {
	const db = getFirestoreDB();
	const lastRef = useRef<QueryDocumentSnapshot<DocumentData>>();

	return async (pageLimit = 15, pageOrderBy: OrderBy = { name: 'createdAt', direction: 'desc' }): Promise<T[]> => {
		let q: Query<DocumentData, DocumentData>;

		if (lastRef.current) {
			q = query(
				collection(db, path),
				orderBy(pageOrderBy.name, pageOrderBy.direction),
				limit(pageLimit),
				startAfter(lastRef.current)
			);
		} else {
			q = query(
				collection(db, path),
				orderBy(pageOrderBy.name, pageOrderBy.direction),
				limit(pageLimit),
			);
		}

		const querySnapshot = await getDocs(q);
		const data: T[] = [];
		lastRef.current = querySnapshot.docs[querySnapshot.docs.length-1];

		querySnapshot.forEach((doc) => {
			data.push({
				id: doc.id,
				...(doc.data() as T),
			});
		});

		return data;
	};
}