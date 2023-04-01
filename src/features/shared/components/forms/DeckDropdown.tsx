import { Select } from '@mantine/core';

import { DeckStore } from '@/lib/dataSource/deck';
import type { SelectItem, SelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> extends Omit<SelectProps, 'data'> {
    topLevelForm: UseFormReturnType<T>;
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

export function DeckDropdown<T>({ topLevelForm, name, ...rest }: Props<T>) {
	return (
		<Select
			{...rest}
			label="Choose a deck"
			{...topLevelForm.getInputProps(name)}
			placeholder="Pick one"
			data={createValues()}
		/>
	);
}
