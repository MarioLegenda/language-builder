import { Select } from '@mantine/core';

import { Loading } from '@/features/shared/components/Loading';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useListDocuments } from '@/lib/dataSource/useListDocuments';
import { ifLoading } from '@/styles/shared/LanguageDropdown.styles';
import type { SelectItem, SelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> extends Omit<SelectProps, 'data'> {
    topLevelForm: UseFormReturnType<T>;
    name: string;
    searchable?: boolean;
}

function createValues(decks: DeckWithID[]): SelectItem[] {
	const values: SelectItem[] = [];
	for (const deck of decks) {
		values.push({
			value: deck.id,
			label: deck.name,
		});
	}

	return values;
}

export function DeckDropdown<T>({ topLevelForm, name, searchable = false, ...rest }: Props<T>) {
	const { isFetching, data } = useListDocuments<DeckWithID>(
		QueryKeys.DECK_LISTING,
		FirestoreMetadata.deckCollection.name,
	);

	return (
		<div css={ifLoading(isFetching)}>
			<Loading visible={isFetching} />
			{!isFetching && data && (
				<Select
					{...rest}
					searchable={searchable}
					label="Choose a deck"
					{...topLevelForm.getInputProps(name)}
					placeholder="Pick one"
					data={createValues(data)}
				/>
			)}
		</div>
	);
}
