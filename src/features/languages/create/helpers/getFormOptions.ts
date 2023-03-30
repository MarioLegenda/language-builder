import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';

export function getFormOptions(store: DataSource<Language>) {
	return {
		validateInputOnChange: true,
		initialValues: {
			name: '',
			shortName: '',
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
