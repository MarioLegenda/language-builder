import { Button } from '@mantine/core';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { useListDocuments } from '@/lib/dataSource/useListDocuments';
export function Root() {
	const { isFetching, isRefetching, data } = useListDocuments<Deck>('decks');
	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	const rows = useCallback(() => {
		if (data) {
			return data.map((item) => (
				<tr key={item.name}>
					<td>{item.name}</td>
					<td>{item.language}</td>

					<td>
						<Button to={`/decks/edit/${item.name}`} component={Link} compact color="gray" variant="outline">
                            Edit
						</Button>
					</td>
					<td>
						<ReactiveButton
							onAction={async () => {
								await mutateAsync({
									path: FirestoreMetadata.languageCollection.name,
									segment: item.language,
								});

								setTimeout(() => {
									invalidateRelated([QueryKeys.LANGUAGE_LISTING]);
								}, 500);
							}}
							timeout={2}>
                            Delete me
						</ReactiveButton>{' '}
					</td>
				</tr>
			));
		}

		return [];
	}, [data]);

	return (
		<>
			<Listing
				showTable={Boolean(data)}
				showNothing={!isFetching && !data}
				rows={rows}
				header={{
					createTo: '/decks/create',
					title: 'Decks',
					showLoading: isRefetching,
				}}
				globalLoader={{
					isLoading: isFetching && !isRefetching,
				}}
				tableRows={['Name', 'Language', 'Edit', 'Delete']}
			/>
		</>
	);
}
