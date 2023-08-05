import { Button } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { usePagination } from '@/lib/dataSource/usePagination';

export function Root() {
	const [direction, setDirection] = useState<'next' | 'previous'>('next');
	const { isFetching, isRefetching, data, refetch } = usePagination<Language>(
		QueryKeys.LANGUAGE_LISTING,
		'languages',
		direction,
	);
	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	const renderRows = useCallback(() => {
		if (data) {
			return data.map((item) => (
				<tr key={item.shortName}>
					<td>{item.name}</td>
					<td>{item.shortName}</td>

					<td>
						<Button
							to={`/admin/languages/edit/${item.shortName}`}
							component={Link}
							compact
							color="gray"
							variant="outline">
                            Edit
						</Button>
					</td>
					<td>
						<ReactiveButton
							onAction={async () => {
								await mutateAsync({
									path: FirestoreMetadata.languageCollection.name,
									segment: item.shortName,
								});

								setTimeout(() => {
									invalidateRelated([QueryKeys.LANGUAGE_LISTING]);
								}, 500);
							}}
							timeout={2}>
                            Delete
						</ReactiveButton>
					</td>
				</tr>
			));
		}

		return [];
	}, [isFetching, data]);

	return (
		<Listing
			showTable={Boolean(data)}
			showNothing={!isFetching && !data}
			rows={renderRows}
			header={{
				createTo: '/admin/languages/create',
				title: 'Languages',
				showLoading: isRefetching,
			}}
			globalLoader={{
				isLoading: isFetching && !isRefetching,
			}}
			tableRows={['Name', 'Short name', 'Edit', 'Delete']}
			onNext={() => {
				setDirection('next');
				refetch();
			}}
			onPrev={() => {
				setDirection('previous');
				refetch();
			}}
		/>
	);
}
