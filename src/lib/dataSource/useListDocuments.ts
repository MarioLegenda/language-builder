import { useQuery } from 'react-query';
import { usePagination } from '@/lib/dataSource/firebase/usePagination';

export function useListDocuments<T>(key: string, path: string) {
	const { next } = usePagination<T>(path);

	return useQuery([key, path], async () => await next(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
