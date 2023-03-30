import { Select } from '@mantine/core';

import { LanguageStore } from '@/lib/dataSource/language';
import type { SelectItem } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> {
    form: UseFormReturnType<T>;
    defaultValue?: string;
    label?: string;
    name: string;
}

function createValues(): SelectItem[] {
	const values: SelectItem[] = [];
	for (const lang of LanguageStore.list()) {
		values.push({
			value: lang.shortName,
			label: lang.name,
		});
	}

	return values;
}

export function LanguageDropdown<T>({ form, name, label }: Props<T>) {
	return (
		<div>
			<Select label={label} {...form.getInputProps(name)} placeholder="Pick one" data={createValues()} />
		</div>
	);
}
