import { Button, Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import { DeleteButton } from '@/features/shared/components/DeleteButton';
import { Header } from '@/features/shared/components/Header';
import { TableBody } from '@/features/shared/components/TableBody';
import { useLanguage } from '@/lib/dataSource/hooks/useLanguage';
import { useRemove } from '@/lib/dataSource/hooks/useRemove';
import * as styles from '@/styles/languages/Root.styles';

export function Root() {
	const { store, persist } = useLanguage();
	const onRemove = useRemove<Language>(store, () => {
		persist();
	});

	const rows = store?.list().map((element) => (
		<tr key={element.shortName}>
			<td>{element.name}</td>
			<td>{element.shortName}</td>

			<td>
				<Button
					to={`/languages/edit/${element.shortName}`}
					component={Link}
					compact
					color="gray"
					variant="outline">
                    Edit
				</Button>
			</td>
			<td>
				<DeleteButton onRemove={() => onRemove(element.shortName)} />
			</td>
		</tr>
	));

	return (
		<div css={styles.root}>
			<Header createTo="/languages/create" title="Languages" />

			{Boolean(rows.length) && (
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Short name</th>

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
