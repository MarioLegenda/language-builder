import { Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInterval } from '@/lib/helpers/useInterval';
import * as styles from '@/styles/games/PickOne.styles';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onDone: () => void;
    engine: PickOneEngine;
}

interface Status {
    isCorrect: boolean;
    isTried: boolean;
    chosenIndex: number | null;
    restartInterval: boolean;
    timer: number;
    currentIndex: number;
}
export function Item({ engine, onDone }: Props) {
	const { timer } = useParams();
	const seconds = parseInt(timer as string);

	const [status, setStatus] = useState<Status>({
		isCorrect: false,
		isTried: false,
		restartInterval: false,
		timer: seconds,
		chosenIndex: null,
		currentIndex: 0,
	});

	const setTimer = () => {
		setStatus((s) => ({ ...s, timer: s.timer - 1 }));
	};

	const setCorrect = (chosenIndex: number) => {
		setStatus((s) => ({ ...s, isTried: true, isCorrect: true, chosenIndex: chosenIndex }));
	};

	const setTried = () => {
		setStatus((s) => ({ ...s, isTried: true, isCorrect: false, chosenIndex: null }));
	};

	useInterval({
		onInterval() {
			setTimer();
		},
		onStop() {
			onDone();
		},
		onQuit() {
			setTimeout(() => {
				setStatus((s) => ({
					isCorrect: false,
					isTried: false,
					chosenIndex: null,
					restartInterval: !s.restartInterval,
					timer: seconds,
					currentIndex: s.currentIndex + 1,
				}));
			}, 2000);
		},
		repeatInterval: 1000,
		maxInterval: seconds,
		quit: status.isTried,
		restart: status.restartInterval,
		stop: status.currentIndex === engine.words.length,
	});

	const onTranslationChoice = useCallback(
		(wordIdx: number, transIdx: number) => {
			if (status.isTried) return;

			const word = engine.words[wordIdx];
			const chosenTranslation = word.choices[transIdx];

			if (word.correctTranslation.name === chosenTranslation.name) {
				setCorrect(transIdx);

				return;
			}

			setTried();
		},
		[status],
	);

	return (
		<>
			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				<Title css={utilStyles.flex('space-between')} order={1}>
					<p>{Boolean(engine.words[status.currentIndex]) && engine.words[status.currentIndex].word} </p>

					<p css={styles.timer(status.timer)}>{status.timer}</p>
				</Title>
			</div>

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
				{Boolean(engine.words[status.currentIndex]) &&
                    engine.words[status.currentIndex].choices.map((item: Translation, i: number) => (
                    	<label
                    		onClick={() => onTranslationChoice(status.currentIndex, i)}
                    		css={[
                    			styles.item,
                    			status.isTried && status.isCorrect && status.chosenIndex === i
                    				? styles.correctItem
                    				: undefined,
                    		]}
                    		key={i}>
                    		{item.name}
                    	</label>
                    ))}
			</div>

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				{status.isTried && status.isCorrect && (
					<p css={styles.status(status.isTried && status.isCorrect)}>CORRECT</p>
				)}

				{status.isTried && !status.isCorrect && (
					<p css={styles.status(status.isTried && status.isCorrect)}>FAILED</p>
				)}
			</div>
		</>
	);
}
