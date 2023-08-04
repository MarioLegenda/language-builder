import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEngine } from '@/features/games/engine/justRepeat/engine';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';

export function useEngine() {
	const { store } = useDeck();
	const { deckId, shuffle, allDecks } = useParams();
	const doShuffle = shuffle === 'shuffle';
	const doAllDecks = allDecks === 'all-decks';
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
