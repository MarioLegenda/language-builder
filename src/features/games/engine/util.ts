// 1. get all translation from all cards of a single language
// 2. pick a random 10 translations
import { CardStore } from '@/lib/dataSource/cards';

export function getTranslations(lang: string): Translation[] {
	const cards = CardStore.all();
	let translations: Translation[] = [];
	const cardsArray = Object.values(cards);

	for (let i = 0, j = cardsArray.length - 1; i < j; i++, j--) {
		if (cardsArray[i].toLanguage === lang) {
			translations = [...translations, ...cardsArray[i].translations];
		}

		if (cardsArray[j].toLanguage === lang) {
			translations = [...translations, ...cardsArray[j].translations];
		}
	}

	return translations;
}

export function getEqual(translation: Translation, translations: Translation[]) {
	let i = 0;
	let j = translations.length;

	while (i < j) {
		i++;
		j--;
	}
}
