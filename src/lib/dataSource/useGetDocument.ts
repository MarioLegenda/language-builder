import { useQuery } from 'react-query';
import { useGetDocument as useGetSingleDocument } from '@/lib/dataSource/firebase';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import type { DocumentData } from '@firebase/firestore';
export function useGetDocument<T extends DocumentData>(path: string, segment: string) {
	const getDocument = useGetSingleDocument<T>(path, segment);

	return useQuery([QueryKeys.LANGUAGE_SINGLE_DOCUMENT, segment], async () => await getDocument(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
