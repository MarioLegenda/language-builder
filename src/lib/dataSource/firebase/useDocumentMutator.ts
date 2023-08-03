import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import { getFirestoreDB, useFirestore } from '@/lib/dataSource/firebase/firebase';
import type { DocumentData, PartialWithFieldValue, WithFieldValue } from '@firebase/firestore';

export function useDocumentMutator<T extends DocumentData>() {
	const db = getFirestoreDB();

	return {
		set: (path: string, segment: string, model: WithFieldValue<T> | PartialWithFieldValue<T>, update: boolean) =>
			setDoc(doc(db, path, segment), model, {
				merge: update,
			}),
		add: (path: string, model: WithFieldValue<T> | PartialWithFieldValue<T>) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
			addDoc(collection(db, path), model),
	};
}
