// 1. get all translation from all cards of a single language
// 2. pick a random 10 translations
import { CardStore } from '@/lib/dataSource/cards';

export function getTranslations(lang: string): Translation[] {
	const cards = CardStore.all();
	let translations: Translation[] = [];
	const cardsArray = Object.values(cards);

	for (let i = 0, j = cardsArray.length - 1; i <= j; i++, j--) {
		if (i === j) {
			const arr = Object.values(cardsArray[i].translations);
			translations = [...translations, ...arr];

			break;
		}

		if (cardsArray[i].toLanguage === lang) {
			const arr = Object.values(cardsArray[i].translations);
			translations = [...translations, ...arr];
		}

		if (cardsArray[j].toLanguage === lang) {
			const arr = Object.values(cardsArray[i].translations);
			translations = [...translations, ...arr];
		}
	}

	return translations;
}
export function getRandomTranslations(num: number, translations: Translation[], exclude: string[]) {
	const chosenIndexes: number[] = [];
	const withoutExclude = translations.filter((item) => !exclude.includes(item.name));
	const possibilities: number[] = [];
	for (let i = 0; i < withoutExclude.length; i++) {
		possibilities.push(i);
	}

	let shuffled = shuffle<number>(possibilities);
	let count = shuffled.length;
	while (count > 0 && num > 0) {
		shuffled = shuffle<number>(possibilities);
		chosenIndexes.push(shuffled[0]);
		shuffled.splice(0, 1);

		num--;
		count--;
	}

	const chosenTranslations: Translation[] = [];
	for (const idx of chosenIndexes) {
		chosenTranslations.push(withoutExclude[idx]);
	}

	return chosenTranslations;
}
function shuffle<T>(array: T[]) {
	let currentIndex = array.length;
	let randomIndex = 0;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
