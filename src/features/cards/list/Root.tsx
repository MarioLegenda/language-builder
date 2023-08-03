import { Button } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '@/features/shared/components/Listing';
import { ReactiveButton } from '@/features/shared/components/ReactiveButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { usePagination } from '@/lib/dataSource/usePagination';

export function Root() {
	const [toLanguageFilter, setToLanguageFilter] = useState<string>('');
	const [fromLanguageFilter, setFromLanguageFilter] = useState<string>('');
	const [listing, setListing] = useState<Card[] | null>(null);

	const { data, isFetching, isRefetching } = usePagination<Card>(
		QueryKeys.CARDS_LISTING,
		FirestoreMetadata.cardsCollection.name,
	);
	const { mutateAsync, invalidateRelated } = useDeleteDocument();

	console.log(isFetching, isRefetching);

	useEffect(() => {
		if (!isFetching && !isRefetching && Boolean(data?.length) && data) {
			setListing(data);
		} else if (!isFetching && !isRefetching && data && !data?.length) {
			setListing(null);
		}
	}, [data, isFetching]);

	useEffect(() => {
		if (toLanguageFilter) {
			// to language filter
		}

		if (fromLanguageFilter) {
			// from language filter
		}
	}, [toLanguageFilter, fromLanguageFilter]);

	const rows = useCallback(() => {
		if (listing) {
			return listing.map((item) => (
				<tr key={item.id}>
					<td>{item.id}</td>
					<td>{item.word}</td>
					<td>{item.fromLanguage}</td>
					<td>{item.toLanguage}</td>
					<td>{Object.values(item.translations).find((item) => item.isMain)?.name}</td>

					<td>
						<Button to={`/cards/edit/${item.word}`} component={Link} compact color="gray" variant="outline">
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
					createTo: '/cards/create',
					title: 'Cards',
					showLoading: isRefetching,
				}}
				globalLoader={{
					isLoading: isFetching && !isRefetching,
				}}
				tableRows={['ID', 'Word', 'From language', 'To language', 'Edit', 'Delete']}
			/>
		</>
	);
}
