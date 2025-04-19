import { Button, Tooltip } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { usePagination } from '@/lib/dataSource/usePagination';

import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const [direction, setDirection] = useState<'next' | 'previous'>('next');

	const { isFetching, isRefetching, data, refetch } = usePagination<DeckWithID>(
		QueryKeys.DECK_LISTING,
		'decks',
		direction,
	);
	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	const rows = useCallback(() => {
		if (data) {
			return data.map((item) => (
				<tr key={item.name}>
					<td css={utilStyles.flex('space-between', 'auto', 'center')}>
						{item.name}
						<Tooltip color="gray" label="Create a card for this deck">
							<Link to="/admin/cards/create">
								<IconCirclePlus />
							</Link>
						</Tooltip>
					</td>
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
					isLoading: isFetching || isRefetching,
				}}
				tableRows={['Name', 'Language', 'Edit', 'Delete']}
				onNext={() => {
					setDirection('next');
					refetch();
				}}
				onPrev={() => {
					setDirection('previous');
					refetch();
				}}
			/>
		</>
	);
}
