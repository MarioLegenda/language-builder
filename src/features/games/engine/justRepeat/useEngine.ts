import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEngine } from '@/features/games/engine/justRepeat/engine';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';

export function useEngine() {
	const { store } = useDeck();
	const { deckId, shuffle } = useParams();
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
		words: createEngine(deck.name, doShuffle),
	};

	return {
		engine: engineRef.current,
		reset: () => {
			engineRef.current = undefined;
			setReset((reset) => reset + 1);
		},
	};
}
