import { getRandomTranslations, getTranslations } from '@/features/games/engine/util';
import { CardStore } from '@/lib/dataSource/cards';
import { shuffle } from '@/lib/helpers/shuffle';

function createVisualCards(cardName: string, exclude: string[]): Translation[] {
	const card = CardStore.get(cardName);

	return getRandomTranslations(5, getTranslations(card.toLanguage), exclude);
}

export function createEngine(deckName: string): PickOneEngineWord[] {
	const cardNames = CardStore.findBy((item) => item.deck === deckName).map((item) => item.word);
	const shuffledCards = shuffle<string>(cardNames);

	const words: PickOneEngineWord[] = [];
	for (const card of shuffledCards) {
		const foundCard = CardStore.get(card);
		const mainTranslation = foundCard.translations.filter((item) => item.isMain)[0];

		words.push({
			word: CardStore.get(card).word,
			choices: shuffle([...createVisualCards(card, [mainTranslation.name]), mainTranslation]),
			correctTranslation: mainTranslation,
		});
	}

	return words;
}
