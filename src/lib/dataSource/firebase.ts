import { doc, getFirestore, setDoc, collection, getDocs, getDoc } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import type { Firestore, WithFieldValue, DocumentData, PartialWithFieldValue } from '@firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
//const analytics = getAnalytics(app);

let app: FirebaseApp;
let firestore: Firestore;

export const initializeFirebase = () => {
	const firebaseConfig = {
		apiKey: 'AIzaSyDDOhV3xFVJF6ZH_4BZOnx09J0TRUlzOX0',
		authDomain: 'vocully-1dd72.firebaseapp.com',
		projectId: 'vocully-1dd72',
		storageBucket: 'vocully-1dd72.appspot.com',
		messagingSenderId: '404593529042',
		appId: '1:404593529042:web:7b3fdbe2e50a37fdf9dd0b',
		measurementId: 'G-EZXZFXJ1K2',
	};

	app = initializeApp(firebaseConfig);
	firestore = getFirestore(app);
};
export const useFirebase = () => app;
export const useFirestore = () => firestore;

export function useDocumentMutator<T extends DocumentData>() {
	const db = useFirestore();

	return (path: string, segment: string, model: WithFieldValue<T> | PartialWithFieldValue<T>, update: boolean) =>
		setDoc(doc(db, path, segment), model, {
			merge: update,
		});
}
export function useGetDocuments<T>(path: string) {
	const db = useFirestore();

	return async () => {
		const querySnapshot = await getDocs(collection(db, path));
		const data: T[] = [];
		querySnapshot.forEach((doc) => {
			data.push(doc.data() as T);
		});

		return data;
	};
}

export function useGetDocument<T extends DocumentData>(path: string, segment: string) {
	const db = useFirestore();

	return async () => {
		const snapshot = await getDoc(doc(db, path, segment));

		if (snapshot.exists()) {
			return snapshot.data() as T;
		}

		throw new Error(`Document ${path}/${segment} does not exist.`);
	};
}
