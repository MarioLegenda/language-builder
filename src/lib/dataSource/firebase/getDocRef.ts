import { collection, doc } from '@firebase/firestore';
import { getFirestoreDB } from '@/lib/dataSource/firebase/firebase';

export function getDocRef(path: string, segment?: string) {
	const db = getFirestoreDB();

	if (!segment) {
		return doc(collection(db, path));
	}

	return doc(collection(db, path, segment));
}
