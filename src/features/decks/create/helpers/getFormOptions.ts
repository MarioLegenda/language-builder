import { DeckStore } from '@/lib/dataSource/deck';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';

export function getFormOptions(initialValues: EditDeckForm) {
	return {
		initialValues: {
			name: initialValues?.name ? initialValues.name : '',
		},
		validate: {
			name: (value: string) => {
				const invalid = requiredAndLimited('name', value, 1, 200);
				if (invalid) return invalid;

				if (DeckStore.has(value)) return `Deck with name ${value} already exists.`;
			},
		},
	};
}
