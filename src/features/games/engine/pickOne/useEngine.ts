import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEngine } from '@/features/games/engine/pickOne/engine';
import { DeckStore } from '@/lib/dataSource/deck';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';
import { Storage } from '@/lib/dataSource/storage';

export function useEngine() {
	const { store } = useDeck();
	const { deckId, allDecks, shuffle } = useParams();
	const doAllDecks = allDecks === 'all-decks';
	const doShuffle = shuffle === 'shuffle';
	const engineRef = useRef<PickOneEngine>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setReset] = useState(0);

	const deck = store.get(deckId as string);
	if (engineRef.current) {
		return {
			engine: engineRef.current,
			reset: () => {
				engineRef.current = undefined;
				setReset((reset) => reset + 1);
			},
		};
	}

	engineRef.current = {
		deck: deck,
		words: (function () {
			if (deckId === 'anonymous-decks') {
				const storage = new Storage('anonymous-decks');
				const deckIds = storage.get('ids') as string[];

				let words: PickOneEngineWord[] = [];
				for (const deckId of deckIds) {
					const deck = DeckStore.get(deckId);
					words = [...words, ...createEngine(deck.id as string, doShuffle)];
				}

				return words;
			}

			if (doAllDecks) {
				const allDecks = Object.values(store.all());
				let words: PickOneEngineWord[] = [];
				for (const deck of allDecks) {
					words = [...words, ...createEngine(deck.id as string, doShuffle)];
				}

				return words;
			}

			return createEngine(deck.id as string, doShuffle);
		})(),
	};

	return {
		engine: engineRef.current,
		reset: () => {
			engineRef.current = undefined;
			setReset((reset) => reset + 1);
		},
	};
}
