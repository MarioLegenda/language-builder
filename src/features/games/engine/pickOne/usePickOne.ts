import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEngine } from '@/features/games/engine/pickOne/pickOneEngine';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';

export function usePickOne() {
	const { store } = useDeck();
	const { deckId } = useParams();
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
		words: createEngine(deck.name),
	};

	return {
		engine: engineRef.current,
		reset: () => {
			engineRef.current = undefined;
			setReset((reset) => reset + 1);
		},
	};
}
