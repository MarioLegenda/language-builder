import { useEffect, useRef, useState } from 'react';

export function useInterval({
	onInterval,
	onExit,
	onStop,
	repeatInterval,
	maxInterval,
	restart,
	stop,
	exit,
}: UseInterval) {
	/**
	 * Used to store return value of setInterval() so that it can be cleaned.
	 */
	const subscriberRef = useRef<NodeJS.Timer | null>(null);
	const stopRef = useRef(false);
	const [numOfRepeats, setNumOfRepeats] = useState<number>(0);

	/**
	 * On startup, just in case, clear subscribing interval if an interval is running so we
	 * have a clean initial state.
	 */
	useEffect(
		() => () => {
			if (subscriberRef.current) clearInterval(subscriberRef.current);
		},
		[],
	);

	useEffect(() => {
		if (numOfRepeats === maxInterval) {
			if (subscriberRef.current) {
				clearInterval(subscriberRef.current);
				onExit();
			}
		}
	}, [numOfRepeats, maxInterval]);

	/**
	 * If a quit signal is sent, stop interval and return to initial state.
	 * The interval can start again if restart signal is sent.
	 */
	useEffect(() => {
		if (exit) {
			if (subscriberRef.current) {
				clearInterval(subscriberRef.current);
				subscriberRef.current = null;
				stopRef.current = false;
				setNumOfRepeats(0);
			}

			onExit();
		}
	}, [exit]);

	useEffect(() => {
		if (stop) {
			stopRef.current = true;
			if (subscriberRef.current) clearInterval(subscriberRef.current);

			onStop();
		}
	}, [stop]);

	useEffect(() => {
		if (stopRef.current) {
			if (subscriberRef.current) clearInterval(subscriberRef.current);
			return;
		}

		setNumOfRepeats(0);

		subscriberRef.current = setInterval(() => {
			onInterval();
			setNumOfRepeats((num) => num + 1);
		}, repeatInterval);
	}, [restart]);
}
