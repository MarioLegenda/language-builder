import { getDefaultTranslationValues } from '@/features/cards/create/helpers/getDefaultTranslationValues';
import { DeckStore } from '@/lib/dataSource/deck';
import { LanguageStore } from '@/lib/dataSource/language';
import { limited } from '@/lib/validation/limited';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';

export function getFormOptions(initialValue?: EditCardForm) {
	return {
		initialValues: {
			word: initialValue?.word ? initialValue.word : '',
			deck: initialValue?.deck ? initialValue.deck : '',
			fromLanguage: initialValue?.fromLanguage ? initialValue.fromLanguage : '',
			toLanguage: initialValue?.toLanguage ? initialValue.toLanguage : '',
			translations: initialValue?.translations ? initialValue.translations : [getDefaultTranslationValues()],
		},
		validate: {
			word: (value: string) => requiredAndLimited('word', value, 1, 200),
			deck: (value: string) => {
				const invalid = requiredAndLimited('deck', value, 2, 2);
				if (invalid) return invalid;
				if (!DeckStore.has(value)) return `'${value}' language does not exist.`;
			},
			fromLanguage: (value: string) => {
				const invalid = requiredAndLimited('fromLanguage', value, 2, 2);
				if (invalid) return invalid;
				if (!LanguageStore.has(value)) return `'${value}' language does not exist.`;
			},
			toLanguage: (value: string) => {
				const invalid = requiredAndLimited('toLanguage', value, 2, 2);
				if (invalid) return invalid;
				if (!LanguageStore.has(value)) return `'${value}' language does not exist.`;
			},
			translations: {
				name: (value: string) => requiredAndLimited('translation', value, 1, 200),
				type: (value: string) => requiredAndLimited('type', value, 1, 100),
				language: (value: string) => requiredAndLimited('language', value, 2, 2),
				gender: (value: string) => limited('gender', value, 1, 10),
				example: (value: string) => limited('example', value, 0, 500),
				hint: (value: string) => limited('hint', value, 0, 500),
				isMain: (value: boolean, values: CreateCardForm) => {
					const hasMain = values.translations.filter((item) => item.isMain).length;
					if (!hasMain) return 'At least one translation has to be the main translation.';
					if (hasMain > 1) return 'There can only be one main translation.';
				},
			},
		},
	};
}
