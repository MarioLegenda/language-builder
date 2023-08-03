import { useQuery } from 'react-query';
import { usePagination as useFirestorePagination } from '@/lib/dataSource/firebase/usePagination';

export function usePagination<T>(key: string, path: string) {
	const paginate = useFirestorePagination<T>(path);

	return useQuery([key, path], async () => await paginate(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
