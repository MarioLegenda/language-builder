import { Select } from '@mantine/core';

import { useState } from 'react';
import { DeckStore } from '@/lib/dataSource/deck';
import type { SelectItem, SelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
interface Props<T> extends Omit<SelectProps, 'data'> {
    topLevelForm: UseFormReturnType<T>;
    name: string;
    onSelected: (data: string) => void;
    language: string;
}
function createValues(language: string): SelectItem[] {
	const values: SelectItem[] = [];
	for (const lang of DeckStore.list()) {
		values.push({
			value: lang.name,
			label: lang.name,
		});
	}

	return values;
}
export function ResettableDeckDropdown<T>({ topLevelForm, name, onSelected, language, ...rest }: Props<T>) {
	const [selected, setSelected] = useState<string | undefined>();

	return (
		<Select
			{...rest}
			label="Choose a deck"
			{...topLevelForm.getInputProps(name)}
			placeholder="Pick one"
			value={selected}
			onChange={(value) => {
				if (value) onSelected(value);

				setSelected(undefined);
			}}
			data={createValues(language)}
		/>
	);
}
