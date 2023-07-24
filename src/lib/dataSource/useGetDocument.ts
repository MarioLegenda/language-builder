import { useQuery } from 'react-query';
import { useGetDocument as useGetSingleDocument } from '@/lib/dataSource/firebase';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import type { DocumentData } from '@firebase/firestore';
export function useGetDocument<T extends DocumentData>(path: string, segment: string) {
	const getDocument = useGetSingleDocument<T>();

	return useQuery(
		[QueryKeys.LANGUAGE_SINGLE_DOCUMENT, segment],
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
