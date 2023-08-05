// 1. get all translation from all cards of a single language
// 2. pick a random {num} translations
import { CardStore } from '@/lib/dataSource/cards';

export function getTranslations(lang: string): TranslationWithID[] {
	const cards = CardStore.all();
	let translations: TranslationWithID[] = [];
	const cardsArray = Object.values(cards);

	for (let i = 0, j = cardsArray.length - 1; i <= j; i++, j--) {
		if (i === j) {
			const arr = Object.values(addIDToTranslations(cardsArray[i].translations));
			translations = [...translations, ...arr];

			break;
		}

		if (cardsArray[i].toLanguage === lang) {
			const arr = Object.values(addIDToTranslations(cardsArray[i].translations));
			translations = [...translations, ...arr];
		}

		if (cardsArray[j].toLanguage === lang) {
			const arr = Object.values(addIDToTranslations(cardsArray[i].translations));
			translations = [...translations, ...arr];
		}
	}

	return translations;
}
export function getRandomTranslations(num: number, translations: TranslationWithID[], exclude: string[]) {
	const chosenIndexes: number[] = [];
	const withoutExclude = translations.filter((item) => !exclude.includes(item.id));
	const possibilities: number[] = [];
	for (let i = 0; i < withoutExclude.length; i++) {
		possibilities.push(i);
	}

	let shuffled = shuffle<number>(possibilities);
	let count = shuffled.length;
	const selectedIds: string[] = [];
	while (count > 0 && num > 0) {
		shuffled = shuffle<number>(possibilities);
		const chosenIdx = shuffled[0];

		if (!selectedIds.includes(withoutExclude[chosenIdx].id)) {
			num--;
			count--;

			selectedIds.push(withoutExclude[chosenIdx].id);
			chosenIndexes.push(chosenIdx);
			shuffled.splice(0, 1);
		}
	}

	const chosenTranslations: TranslationWithID[] = [];
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

function addIDToTranslations(translations: Record<string, Translation>): TranslationWithID[] {
	const ids = Object.keys(translations);

	const created: TranslationWithID[] = [];
	for (const id of ids) {
		created.push({ ...translations[id], id: id });
	}

	return created;
}

export function createMainTranslationWithID(translations: Record<string, Translation>): TranslationWithID {
	const ids = Object.keys(translations);

	for (const id of ids) {
		if (translations[id].isMain) {
			return { ...translations[id], id: id };
		}
	}

	throw new Error('ID for main translation not found.');
}

export function speak(text: string, lang: string, onEnd?: () => void) {
	const utterance = new SpeechSynthesisUtterance();

	utterance.text = text;
	utterance.lang = lang;
	utterance.voice = speechSynthesis.getVoices()[0];

	// Speak the utterance
	speechSynthesis.speak(utterance);

	if (onEnd) {
		utterance.onend = onEnd;
	}

	utterance.onerror = () => {
		console.log('sadflkasjdfčljaskdf');
		onEnd?.();
	};
}

export function langToBCP(lang: string) {
	if (lang === 'it') {
		return 'it-IT';
	}

	return 'it-IT';
}
