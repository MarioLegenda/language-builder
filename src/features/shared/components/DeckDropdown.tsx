import { Select } from '@mantine/core';

import { useState } from 'react';
import { DeckStore } from '@/lib/dataSource/deck';
import type { SelectItem } from '@mantine/core';

interface Props {
    onChange(name: string): void;
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

export function DeckDropdown({ onChange }: Props) {
	const [value, setValue] = useState<string>();

	return (
		<Select
			label="Choose a deck"
			onChange={(value: string) => {
				setValue(value);
				onChange(value);
			}}
			value={value}
			placeholder="Pick one"
			data={createValues()}
		/>
	);
}
