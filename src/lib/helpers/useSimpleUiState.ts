import { useCallback, useState } from 'react';

function getTrueState<T extends string>(states: Record<T, boolean>): T | null {
	const keys = Object.keys(states);

	for (const key of keys) {
		if (states[key as T]) {
			return key as T;
		}
	}

	return null;
}

export function useSimpleUiState<T extends string>(states: Record<T, boolean>) {
	const [current, setCurrent] = useState<T | null>(getTrueState(states));
	const [internalStates, setInternalStates] = useState(states);

	const onSet = useCallback(
		(state: T) => {
			const t = { ...internalStates };
			const keys = Object.keys(t);

			for (const key of keys) {
				if (key === state) {
					t[key as T] = true;
				} else {
					t[key as T] = false;
				}
			}

			setInternalStates(t);
			setCurrent(state);
		},
		[current, internalStates],
	);

	const onClear = useCallback(
		(state: T) => {
			const t = { ...internalStates };
			const keys = Object.keys(t);

			for (const key of keys) {
				if (key === state) {
					t[key as T] = false;
				}
			}

			setInternalStates(t);
			setCurrent(null);
		},
		[current, internalStates],
	);

	return {
		set: onSet,
		clear: onClear,
		current,
	};
}
