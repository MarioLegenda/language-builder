import {doc} from '@firebase/firestore';
import {getFirestoreDB} from '@/lib/dataSource/firebase/firebase';

export function getDocRef(path: string, segment?: string) {
	const db = getFirestoreDB();

	if (!segment) {
		return doc(db, path);
	}

	return doc(db, path, segment);
}