import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEngine } from '@/features/games/engine/pickOne/engine';
import { DeckStore } from '@/lib/dataSource/deck';

export function useEngine() {
	const { num } = useParams();
	const engineRef = useRef<ClubRandomEngine>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setReset] = useState(0);

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
		words: (function () {
			let words: PickOneEngineWord[] = [];
			const allDecks = Object.values(DeckStore.all());
			let random = parseInt(num as string);

			if (!random || random === 0 || random > DeckStore.count()) {
				random = 5;
			}

			const picked: number[] = [];
			for (;;) {
				if (picked.length === random) {
					break;
				}

				const idx = Math.floor(Math.random() * allDecks.length);

				if (picked.includes(idx)) continue;

				picked.push(idx);
				const deck = allDecks[idx];

				words = [...words, ...createEngine(deck.id as string, true)];
			}

			return words;
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
