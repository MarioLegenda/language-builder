import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';

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

export function LanguageDropdown<T>({ defaultValue, form, name, label }: Props<T>) {
	const [value, setValue] = useState<string | undefined>();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	return (
		<div>
			<Select
				label={label}
				{...form.getInputProps(name)}
				value={value}
				placeholder="Pick one"
				data={createValues()}
			/>
		</div>
	);
}
