import { useQuery } from 'react-query';
import { useGetDocuments } from '@/lib/dataSource/firebase';
import { QueryKeys } from '@/lib/dataSource/queryKeys';

export function useListDocuments<T>(path: string) {
	const list = useGetDocuments<T>(path);

	return useQuery([QueryKeys.LANGUAGE_LISTING, path], async () => await list(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
