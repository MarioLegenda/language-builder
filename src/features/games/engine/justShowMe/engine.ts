import { CardStore } from '@/lib/dataSource/cards';
import { DeckStore } from '@/lib/dataSource/deck';
import { Storage } from '@/lib/dataSource/storage';
import { shuffle } from '@/lib/helpers/shuffle';

export function createEngine(deckName: string) {
	if (deckName === 'anonymous-decks') {
		const storage = new Storage('anonymous-decks');
		const ids = storage.get('ids') as string[];

		let allCards: Card[] = [];
		for (const deckId of ids) {
			const deck = DeckStore.get(deckId) as Deck;

			const cards = CardStore.findBy((item) => item.deck === deck.id);

			allCards = [...allCards, ...cards];
		}

		return createCardTranslation(allCards);
	}

	return createCardTranslation(CardStore.findBy((item) => item.deck === deckName));
}

function createCardTranslation(cards: Card[]) {
	for (const card of cards) {
		card.translationsArray = Object.values(card.translations);
		card.translationsArray.sort((a) => {
			if (a.isMain) return -1;
			return 1;
		});
	}

	return cards;
}
