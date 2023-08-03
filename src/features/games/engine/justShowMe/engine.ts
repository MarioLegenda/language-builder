import { CardStore } from '@/lib/dataSource/cards';
import { shuffle } from '@/lib/helpers/shuffle';

export function createEngine(deckName: string) {
	const cards = CardStore.findBy((item) => item.deck === deckName);

	for (const card of cards) {
		card.translationsArray = Object.values(card.translations);
		card.translationsArray.sort((a) => {
			if (a.isMain) return -1;
			return 1;
		});
	}

	return shuffle(cards);
}
