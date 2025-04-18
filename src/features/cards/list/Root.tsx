import { Button } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { useGetDocument } from '@/lib/dataSource/firebase/useGetDocument';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { usePagination } from '@/lib/dataSource/usePagination';

export function Root() {
	const [listing, setListing] = useState<Card[] | null>(null);
	const getDocument = useGetDocument<Deck>();

	const [direction, setDirection] = useState<'next' | 'previous'>('next');
	const { data, isFetching, isRefetching, refetch } = usePagination<Card>(
		QueryKeys.CARDS_LISTING,
		FirestoreMetadata.cardsCollection.name,
		direction,
		async (data) => {
			const deckIds = data.map((d) => d.deck);
			const docPromises = deckIds.map(id => getDocument('decks', id));
			const docs = await Promise.all(docPromises);

			docs.forEach(documentData => {
				if (!documentData) return;

				for (const d of data) {
					if (d.deck === documentData.id) {
						d.deck = documentData.name;
					}
				}
			});

			return data;
		}
	);

	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	useEffect(() => {
		if (!isFetching && !isRefetching && Boolean(data?.length) && data) {
			setListing(data);
		} else if (!isFetching && !isRefetching && data && !data?.length) {
			setListing(null);
		}
	}, [data, isFetching]);

	const rows = useCallback(() => {
		if (listing) {
			return listing.map((item) => (
				<tr key={item.id}>
					<td>{item.word}</td>
					<td>{item.fromLanguage}</td>
					<td>{item.toLanguage}</td>
					<td>{item.deck}</td>
					<td>{Object.values(item.translations).find((item) => item.isMain)?.name}</td>

					<td>
						<Button
							to={`/admin/cards/edit/${item.word}`}
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
								if (typeof item.id !== 'string') return;

								await mutateAsync({
									path: FirestoreMetadata.cardsCollection.name,
									segment: item.id,
								});

								setTimeout(() => {
									invalidateRelated([
										QueryKeys.CARDS_LISTING,
										FirestoreMetadata.cardsCollection.name,
									]);
								}, 500);
							}}
							timeout={2}>
                            Delete me
						</ReactiveButton>
					</td>
				</tr>
			));
		}

		return [];
	}, [listing]);

	return (
		<>
			<Listing
				showTable={Boolean(listing)}
				showNothing={!isFetching && !listing}
				rows={rows}
				header={{
					createTo: '/admin/cards/create',
					title: 'Cards',
					showLoading: isRefetching,
				}}
				globalLoader={{
					isLoading: isFetching || isRefetching,
				}}
				tableRows={['Word', 'From language', 'To language', 'Deck', 'Translation', 'Edit', 'Delete']}
				onNext={() => {
					setDirection('previous');
					refetch();
				}}
				onPrev={() => {
					setDirection('next');
					refetch();
				}}
			/>
		</>
	);
}
