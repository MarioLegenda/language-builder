import { Button, Table } from '@mantine/core';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '@/features/shared/components/DeleteButton';
import { Header } from '@/features/shared/components/Header';
import { Loading } from '@/features/shared/components/Loading';
import { TableBody } from '@/features/shared/components/TableBody';
import { FirestoreMetadata } from '@/lib/dataSource/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useDeleteDocument } from '@/lib/dataSource/useDeleteDocument';
import { useListDocuments } from '@/lib/dataSource/useListDocuments';
import * as styles from '@/styles/languages/Root.styles';

export function Root() {
	const { isFetching, data } = useListDocuments<Language>('languages');
	const { mutateAsync, isLoading, invalidateRelated } = useDeleteDocument();

	const renderRows = useCallback(() => {
		if (!isFetching && data) {
			return data.map((item) => (
				<tr key={item.shortName}>
					<td>{item.name}</td>
					<td>{item.shortName}</td>

					<td>
						<Button
							to={`/languages/edit/${item.shortName}`}
							component={Link}
							compact
							color="gray"
							variant="outline">
                            Edit
						</Button>
					</td>
					<td>
						<DeleteButton
							onRemove={async () => {
								await mutateAsync({
									path: FirestoreMetadata.languageCollection.name,
									segment: item.shortName,
								});

								setTimeout(() => {
									invalidateRelated([QueryKeys.LANGUAGE_LISTING]);
								}, 100);
							}}
						/>
					</td>
				</tr>
			));
		}

		return [];
	}, [isFetching, data]);

	return (
		<div>
			<Header createTo="/languages/create" title="Languages" />

			<Loading visible={isFetching} />

			{!isFetching && data && (
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Short name</th>

							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<TableBody rows={renderRows()} />
				</Table>
			)}

			{!isFetching && !data && <p css={styles.nothingFound}>Nothing found</p>}
		</div>
	);
}
