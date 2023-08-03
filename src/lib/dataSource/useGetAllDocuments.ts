import { useQuery } from 'react-query';
import {useGetAll} from '@/lib/dataSource/firebase/useGetAll';
import type {DocumentData} from '@firebase/firestore';

export function useGetAllDocuments<T extends DocumentData>(key: string, path: string) {
	const getAll = useGetAll<T>();

	return useQuery([key, path], async () => await getAll(path), {
		retry: 0,
		staleTime: Infinity,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
}
