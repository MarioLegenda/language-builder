import { collection, getDocs, limit, orderBy, query, startAfter, endBefore } from '@firebase/firestore';
import { useRef } from 'react';
import { getFirestoreDB } from '@/lib/dataSource/firebase/firebase';
import type { DocumentData, Query, QueryDocumentSnapshot } from '@firebase/firestore';

export function usePagination<T>(path: string) {
	const db = getFirestoreDB();
	const lastRef = useRef<QueryDocumentSnapshot<DocumentData>>();
	const previousRef = useRef<QueryDocumentSnapshot<DocumentData>>();

	return {
		next: async (pageLimit = 15, pageOrderBy: OrderBy = { name: 'createdAt', direction: 'desc' }): Promise<T[]> => {
			let q: Query<DocumentData, DocumentData>;

			if (lastRef.current) {
				q = query(
					collection(db, path),
					orderBy(pageOrderBy.name, pageOrderBy.direction),
					limit(pageLimit),
					startAfter(lastRef.current),
				);
			} else {
				q = query(collection(db, path), orderBy(pageOrderBy.name, pageOrderBy.direction), limit(pageLimit));
			}

			const querySnapshot = await getDocs(q);
			const data: T[] = [];
			lastRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
			previousRef.current = querySnapshot.docs[0];

			querySnapshot.forEach((documentSnapshot) => {
				const d = documentSnapshot.data();

				data.push({
					id: documentSnapshot.id,
					...(d as T),
				});
			});

			return data;
		},
		previous: async (
			pageLimit = 15,
			pageOrderBy: OrderBy = { name: 'createdAt', direction: 'desc' },
		): Promise<T[]> => {
			let q: Query<DocumentData, DocumentData>;

			if (previousRef.current) {
				q = query(
					collection(db, path),
					orderBy(pageOrderBy.name, pageOrderBy.direction),
					limit(pageLimit),
					endBefore(previousRef.current),
				);
			} else {
				q = query(collection(db, path), orderBy(pageOrderBy.name, pageOrderBy.direction), limit(pageLimit));
			}

			const querySnapshot = await getDocs(q);
			const data: T[] = [];
			lastRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
			previousRef.current = querySnapshot.docs[0];

			querySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...(doc.data() as T),
				});
			});

			return data;
		},
		reset: async (
			pageLimit = 15,
			pageOrderBy: OrderBy = { name: 'createdAt', direction: 'desc' },
		): Promise<T[]> => {
			const q = query(collection(db, path), orderBy(pageOrderBy.name, pageOrderBy.direction), limit(pageLimit));

			const querySnapshot = await getDocs(q);
			const data: T[] = [];
			lastRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
			previousRef.current = querySnapshot.docs[0];

			querySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...(doc.data() as T),
				});
			});

			return data;
		},
	};
}
