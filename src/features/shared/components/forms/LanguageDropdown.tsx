import { Select } from '@mantine/core';

import { Loading } from '@/features/shared/components/Loading';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useListDocuments } from '@/lib/dataSource/useListDocuments';
import { ifLoading } from '@/styles/shared/LanguageDropdown.styles';
import type { SelectItem } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> {
    name: string;
    form: UseFormReturnType<T>;
    defaultValue?: string;
    label?: string;
}

function createValues(languages: Language[]): SelectItem[] {
	const values: SelectItem[] = [];
	for (const lang of languages) {
		values.push({
			value: lang.shortName,
			label: lang.name,
		});
	}

	return values;
}

export function LanguageDropdown<T>({ form, name, label }: Props<T>) {
	const { isFetching, data } = useListDocuments<Language>(
		QueryKeys.LANGUAGE_LISTING,
		FirestoreMetadata.languageCollection.name,
	);

	return (
		<div css={ifLoading(isFetching)}>
			<Loading visible={isFetching} />
			{!isFetching && data && (
				<Select label={label} {...form.getInputProps(name)} placeholder="Pick one" data={createValues(data)} />
			)}
		</div>
	);
}
