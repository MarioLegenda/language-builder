import { useQuery } from 'react-query';
import { useGetDocuments } from '@/lib/dataSource/firebase/useGetDocuments';

export function useListDocuments<T>(key: string, path: string) {
	const list = useGetDocuments<T>(path);

	return useQuery([key, path], async () => await list(), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
