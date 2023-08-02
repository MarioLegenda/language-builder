import { useQuery } from 'react-query';
import { useGetDocument as useGetSingleDocument } from '@/lib/dataSource/firebase/useGetDocument';
import type { DocumentData } from '@firebase/firestore';
export function useGetDocument<T extends DocumentData>(query: string, path: string, segment: string) {
	const getDocument = useGetSingleDocument<T>();

	return useQuery(
		[query, segment],
		async () => {
			const res = await getDocument(path, segment);

			if (!res) throw new Error('Document not found');

			return res;
		},
		{
			retry: 0,
			staleTime: Infinity,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
	);
}
