import { Button, Pagination, Select, Table } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '@/features/shared/components/DeleteButton';
import { Header } from '@/features/shared/components/Header';
import { TableBody } from '@/features/shared/components/TableBody';
import { useCard } from '@/lib/dataSource/hooks/useCard';
import { useLanguage } from '@/lib/dataSource/hooks/useLanguage';
import { useRemove } from '@/lib/dataSource/hooks/useRemove';
import * as styles from '@/styles/languages/Root.styles';

export function Root() {
	const { store, persist } = useCard();
	const { store: languageStore } = useLanguage();
	const onRemove = useRemove<Card>(store, () => {
		persist();
	});
	const [offset, setOffset] = useState(1);
	const [toLanguageFilter, setToLanguageFilter] = useState<string>('');
	const [fromLanguageFilter, setFromLanguageFilter] = useState<string>('');

	let listing = store?.paginate(offset, 15);
	if (toLanguageFilter) {
		listing = listing.filter((val) => toLanguageFilter && val.toLanguage === toLanguageFilter);
	}

	if (fromLanguageFilter) {
		listing = listing.filter((val) => fromLanguageFilter && val.fromLanguage === fromLanguageFilter);
	}

	const rows = listing.map((element, i) => (
		<tr key={i}>
			<td>{element.id}</td>
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
		<div>
			<Header createTo="/cards/create" title="Cards" />

			<div css={styles.filters}>
				<label css={styles.filtersLabel}>Filter by:</label>

				<div css={styles.filtersList}>
					<Select
						label="To language"
						placeholder="To language"
						data={languageStore.list().map((item) => ({
							value: item.shortName,
							label: item.name,
						}))}
						onChange={(value) => {
							if (value) setToLanguageFilter(value);
						}}
					/>

					<Select
						label="From language"
						placeholder="From language"
						data={languageStore.list().map((item) => ({
							value: item.shortName,
							label: item.name,
						}))}
						onChange={(value) => {
							if (value) setFromLanguageFilter(value);
						}}
					/>
				</div>
			</div>

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

			<div css={styles.pagination}>
				<Pagination page={offset} onChange={setOffset} total={Math.ceil(store.count() / 15)} />
			</div>
		</div>
	);
}
