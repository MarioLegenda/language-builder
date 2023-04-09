import { Button, Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import { DeleteButton } from '@/features/shared/components/DeleteButton';
import { Header } from '@/features/shared/components/Header';
import { TableBody } from '@/features/shared/components/TableBody';
import { useCard } from '@/lib/dataSource/hooks/useCard';
import { useRemove } from '@/lib/dataSource/hooks/useRemove';
import * as styles from '@/styles/languages/Root.styles';

export function Root() {
	const { store, persist } = useCard();
	const onRemove = useRemove<Card>(store, () => {
		persist();
	});

	const rows = store?.list().map((element, i) => (
		<tr key={i}>
			<td>{i + 1}</td>
			<td>{element.word}</td>
			<td>{element.fromLanguage}</td>
			<td>{element.toLanguage}</td>
			<td>{element.translations.find((item) => item.isMain)?.name}</td>

			<td>
				<Button to={`/cards/edit/${element.word}`} component={Link} compact color="gray" variant="outline">
                    Edit
				</Button>
			</td>
			<td>
				<DeleteButton onRemove={() => onRemove(element.word)} />
			</td>
		</tr>
	));

	return (
		<div css={styles.root}>
			<Header createTo="/cards/create" title="Cards" />

			{Boolean(rows.length) && (
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>From language</th>
							<th>To language</th>
							<th>Main translation</th>

							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<TableBody rows={rows} />
				</Table>
			)}

			{!rows.length && <p css={styles.nothingFound}>Nothing found</p>}
		</div>
	);
}
