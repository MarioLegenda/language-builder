import { useQuery } from 'react-query';
import { usePagination } from '@/lib/dataSource/firebase/usePagination';

export function useListDocuments<T>(key: string, path: string) {
	const list = usePagination<T>(path);

	return useQuery([key, path], async () => await list(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
