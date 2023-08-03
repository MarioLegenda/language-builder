import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import type { Firestore } from '@firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

let app: FirebaseApp;
let firestore: Firestore;

export const initializeFirebase = () => {
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
	};

	app = initializeApp(firebaseConfig);
	firestore = getFirestore(app);
};
export const useFirestore = () => firestore;

export const getFirestoreDB = () => firestore;
