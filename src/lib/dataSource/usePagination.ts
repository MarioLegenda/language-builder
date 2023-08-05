import { useQuery } from 'react-query';
import { usePagination as useFirestorePagination } from '@/lib/dataSource/firebase/usePagination';

export function usePagination<T>(key: string, path: string, direction: 'next' | 'previous' = 'next') {
	const { next, previous } = useFirestorePagination<T>(path);

	return useQuery(
		[key, path],
		async () => {
			if (direction === 'previous') {
				return await previous();
			}

			return await next();
		},
		{
			retry: 0,
			staleTime: Infinity,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
	);
}
