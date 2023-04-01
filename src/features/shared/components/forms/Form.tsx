import { useForm } from '@mantine/form';
import React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { UseFormReturnType } from '@mantine/form';
import type { UseFormInput } from '@mantine/form/lib/types';

interface Props<T> extends UseFormInput<T> {
    onSubmit: (data: T) => void;
    customStyles?: SerializedStyles | SerializedStyles[];
    fields: (form: UseFormReturnType<T>) => React.ReactNode;
}

export function Form<T>({ fields, onSubmit, customStyles, ...rest }: Props<T>) {
	const form = useForm(rest);

	return (
		<form css={customStyles} onSubmit={form.onSubmit(onSubmit)}>
			{fields(form)}
		</form>
	);
}
