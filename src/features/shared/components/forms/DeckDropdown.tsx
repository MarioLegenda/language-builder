import { Select } from '@mantine/core';

import { DeckStore } from '@/lib/dataSource/deck';
import type { SelectItem } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> {
    form: UseFormReturnType<T>;
    name: string;
}

function createValues(): SelectItem[] {
	const values: SelectItem[] = [];
	for (const lang of DeckStore.list()) {
		values.push({
			value: lang.name,
			label: lang.name,
		});
	}

	return values;
}

export function DeckDropdown<T>({ form, name }: Props<T>) {
	return (
		<div>
			<Select label="Choose a deck" {...form.getInputProps(name)} placeholder="Pick one" data={createValues()} />
		</div>
	);
}
