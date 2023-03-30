import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';

export function getFormOptions(store: DataSource<Deck>, initialValues: EditDeckForm) {
	return {
		initialValues: {
			name: initialValues?.name ? initialValues.name : '',
		},
		validate: {
			name: (value: string) => {
				const invalid = requiredAndLimited('name', value, 1, 200);
				if (invalid) return invalid;

				if (store.has(value)) return `Deck with name ${value} already exists.`;
			},
		},
	};
}
