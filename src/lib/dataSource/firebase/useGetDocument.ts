import { doc, getDoc } from '@firebase/firestore';
import { useFirestore } from '@/lib/dataSource/firebase/firebase';
import type { DocumentData } from '@firebase/firestore';

export function useGetDocument<T extends DocumentData>() {
	const db = useFirestore();

	return async (path: string, segment: string) => {
		const snapshot = await getDoc(doc(db, path, segment));

		if (snapshot.exists()) {
			return {id: snapshot.id, ...snapshot.data() as T};
		}

		return null;
	};
}
