import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';

export function getFormOptions(store: DataSource<Language>, initialValue?: EditLanguageForm) {
	return {
		validateInputOnChange: true,
		initialValues: {
			name: initialValue?.name ? initialValue.name : '',
			shortName: initialValue?.shortName ? initialValue.shortName : '',
		},
		validate: {
			name: (value: string) => requiredAndLimited('name', value, 1, 200),
			shortName: (value: string) => {
				const invalid = requiredAndLimited('name', value, 1, 200);

				if (invalid) {
					return invalid;
				}

				if (store.has(value)) {
					return `'${value}' language already exists`;
				}
			},
		},
	};
}
