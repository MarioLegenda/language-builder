import {
	getFirestore,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import type { Firestore } from '@firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

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
export const useFirestore = () => firestore;

export const getFirestoreDB = () => firestore;