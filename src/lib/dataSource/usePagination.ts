import { useQuery } from 'react-query';
import { usePagination as useFirestorePagination } from '@/lib/dataSource/firebase/usePagination';

export function usePagination<T>(
	key: string,
	path: string,
	direction: 'next' | 'previous' = 'next',
	dataMutator?: (data: T[]) => Promise<T[]>,
) {
	const { next, previous } = useFirestorePagination<T>(path);

	return useQuery(
		[key, path],
		async () => {
			if (direction === 'previous') {
				const d = await previous();
				if (dataMutator) {
					return dataMutator(d);
				}

				return d;
			}

			const d = await next();
			if (dataMutator) {
				return dataMutator(d);
			}
			return d;
		},
		{
			retry: 0,
			staleTime: Infinity,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
	);
}
