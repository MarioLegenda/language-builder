import { useQuery } from '@/lib/dataSource/firebase/firebase';

export function useSingleQuery<T>() {
	const query = useQuery<T>();

	return async (path: string, ...whereArgs: FirestoreWhere[]): Promise<T | undefined> => {
		const { response, error } = await query(path, ...whereArgs);

		if (response) {
			return response;
		}

		if (error) {
			return undefined;
		}
	};
}
