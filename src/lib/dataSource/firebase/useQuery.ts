import { collection, getDocs, query, where } from '@firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { useFirestore } from '@/lib/dataSource/firebase/firebase';

export function useQuery<T>() {
	const db = useFirestore();

	return async (path: string, ...whereArgs: FirestoreWhere[]): Promise<ResponseOrError<T>> => {
		const whereParams = [];
		for (const w of whereArgs) {
			whereParams.push(where(w.fieldPath, w.opStr, w.value));
		}

		try {
			const querySnapshot = await getDocs(query(collection(db, path), ...whereParams));

			const data: T[] = [];

			querySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...(doc.data() as T),
				});
			});

			if (data.length !== 0) {
				return {
					response: data[0],
				};
			}

			return {
				response: null,
			};
		} catch (e) {
			if (e instanceof FirebaseError) {
				return {
					error: new Error(e.message),
				};
			}

			return {
				error: new Error('An error occurred'),
			};
		}
	};
}
