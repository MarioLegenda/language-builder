import {Button, Tooltip} from '@mantine/core';
import {IconCirclePlus} from '@tabler/icons';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { useListDocuments } from '@/lib/dataSource/useListDocuments';

import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const { isFetching, isRefetching, data } = useListDocuments<DeckWithID>(QueryKeys.DECK_LISTING, 'decks');
	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	const rows = useCallback(() => {
		if (data) {
			return data.map((item) => (
				<tr key={item.name}>
					<td css={utilStyles.flex('space-between', 'auto', 'center')}>{item.name}
						<Tooltip color="gray" label="Create a card for this deck">
							<Link to="/admin/cards/create">
								<IconCirclePlus />
							</Link>
						</Tooltip></td>
					<td>{item.language}</td>

					<td>
						<Button
							to={`/admin/decks/edit/${item.id}`}
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
									path: FirestoreMetadata.deckCollection.name,
									segment: item.id,
								});

								setTimeout(() => {
									invalidateRelated([QueryKeys.DECK_LISTING]);
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
					createTo: '/admin/decks/create',
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
