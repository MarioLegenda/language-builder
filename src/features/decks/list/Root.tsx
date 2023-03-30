import { Button, Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import { DeleteButton } from '@/features/shared/components/DeleteButton';
import { Header } from '@/features/shared/components/Header';
import { TableBody } from '@/features/shared/components/TableBody';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';
import { useRemove } from '@/lib/dataSource/hooks/useRemove';
import * as styles from '@/styles/languages/Root.styles';

export function Root() {
	const { store, persist } = useDeck();
	const onRemove = useRemove<Deck>(store, () => {
		persist();
	});

	const rows = store?.list().map((element) => (
		<tr key={element.name}>
			<td>{element.name}</td>

			<td>
				<Button to={`/decks/edit/${element.name}`} component={Link} compact color="gray" variant="outline">
                    Edit
				</Button>
			</td>
			<td>
				<DeleteButton onRemove={() => onRemove(element.name)} />
			</td>
		</tr>
	));

	return (
		<div css={styles.root}>
			<Header createTo="/decks/create" title="Decks" />

			{rows && (
				<Table>
					<thead>
						<tr>
							<th>Name</th>

							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<TableBody rows={rows} />
				</Table>
			)}
		</div>
	);
}
