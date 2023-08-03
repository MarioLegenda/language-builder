import { getRandomTranslations, getTranslations } from '@/features/games/engine/util';
import { CardStore } from '@/lib/dataSource/cards';
import { shuffle } from '@/lib/helpers/shuffle';

function createVisualCards(cardName: string, exclude: string[]): Translation[] {
	const card = CardStore.get(cardName);

	return getRandomTranslations(5, getTranslations(card.toLanguage), exclude);
}
export function createEngine(deckName: string, doShuffle: boolean): PickOneEngineWord[] {
	const cardNames = CardStore.findBy((item) => item.deck === deckName).map((item) => item.id) as string[];
	const shuffledCards = shuffle<string>(cardNames);

	const words: PickOneEngineWord[] = [];
	let currentMainPointer = 0;
	let currentPointer = 0;
	let repeats = [5, 4, 3, 2];

	while (currentMainPointer !== shuffledCards.length) {
		const len =
            shuffledCards.length - currentMainPointer > 4
            	? currentPointer + 4
            	: currentPointer + shuffledCards.length - currentMainPointer;
		for (let i = currentPointer; i < len; i++) {
			const numOfRepeats = repeats.shift() as number;
			const card = shuffledCards[i];

			const foundCard = CardStore.get(card);
			if (foundCard) {
				const translations = Object.values(foundCard.translations);
				const mainTranslation = translations.filter((item) => item.isMain)[0];

				for (let a = 0; a < numOfRepeats; a++) {
					words.push({
						word: CardStore.get(card).word,
						choices: shuffle([...createVisualCards(card, [mainTranslation.name]), mainTranslation]),
						correctTranslation: mainTranslation,
					});
				}
			}
		}

		currentMainPointer++;
		currentPointer = currentMainPointer;
		repeats = [5, 4, 3, 2];
	}

	return doShuffle ? shuffle(words) : words;
}
