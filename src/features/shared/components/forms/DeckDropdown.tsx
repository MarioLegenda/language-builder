import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';

import { DeckStore } from '@/lib/dataSource/deck';
import type { SelectItem } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface Props<T> {
    form: UseFormReturnType<T>;
    defaultValue?: string;
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

export function DeckDropdown<T>({ defaultValue, form, name }: Props<T>) {
	const [value, setValue] = useState<string | undefined>();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	return (
		<div>
			<Select {...form.getInputProps(name)} value={value} placeholder="Pick one" data={createValues()} />
		</div>
	);
}
