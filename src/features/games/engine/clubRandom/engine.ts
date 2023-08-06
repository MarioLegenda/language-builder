import { createMainTranslationWithID, getRandomTranslations, getTranslations } from '@/features/games/engine/util';
import { CardStore } from '@/lib/dataSource/cards';
import { shuffle } from '@/lib/helpers/shuffle';

function createVisualCards(cardName: string, exclude: string[]): TranslationWithID[] {
	const card = CardStore.get(cardName);

	return getRandomTranslations(5, getTranslations(card.toLanguage), exclude);
}

export function createEngine(deckName: string, doShuffle = false): PickOneEngineWord[] {
	const cardNames = CardStore.findBy((item) => item.deck === deckName).map((item) => item.id) as string[];
	const shuffledCards = shuffle<string>(cardNames);

	const words: PickOneEngineWord[] = [];
	for (const card of shuffledCards) {
		const foundCard = CardStore.get(card);
		const mainTranslation: TranslationWithID = createMainTranslationWithID(foundCard.translations);

		words.push({
			word: CardStore.get(card).word,
			choices: shuffle([...createVisualCards(card, [mainTranslation.id]), mainTranslation]),
			correctTranslation: mainTranslation,
		});
	}

	return doShuffle ? shuffle(words) : words;
}
