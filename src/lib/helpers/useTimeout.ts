import { useEffect, useState } from 'react';

export function useTimeout(
	interval: number,
	onTick: (isFinished: boolean, reset: boolean) => void,
	stop: boolean,
	restart: boolean,
) {
	const [unsubscribe, setUnsubscribe] = useState<NodeJS.Timer | undefined>();
	const [internalStop, setInternalStop] = useState(stop);

	useEffect(() => {
		setInternalStop(stop);
	}, [stop]);

	useEffect(() => {
		if (internalStop) {
			if (unsubscribe) {
				clearTimeout(unsubscribe);
				setUnsubscribe(undefined);
			}

			onTick(true, restart);

			return;
		}
	}, [internalStop]);

	useEffect(() => {
		const t = setTimeout(() => {
			onTick(true, restart);
			setInternalStop(true);
		}, interval);
		setUnsubscribe(t);
	}, [restart]);

	useEffect(
		() => () => {
			clearTimeout(unsubscribe);
			setUnsubscribe(undefined);
		},
		[unsubscribe, stop],
	);
}
