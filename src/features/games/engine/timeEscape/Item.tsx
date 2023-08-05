import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Success } from '@/features/games/components/Success';
import { Word } from '@/features/games/components/Word';
import {langToBCP, speak} from '@/features/games/engine/util';
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
	const timeoutRef = useRef<NodeJS.Timeout>();

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

	const setTried = (chosenIdx: number) => {
		setStatus((s) => ({ ...s, isTried: true, isCorrect: false, chosenIndex: chosenIdx }));
	};

	useInterval({
		onInterval() {
			setTimer();
		},
		onStop() {
			onDone();
		},
		onExit() {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = undefined;
			}

			timeoutRef.current = setTimeout(() => {
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
		exit: status.isTried || status.currentIndex === engine.words.length,
		restart: status.restartInterval,
		stop: status.currentIndex === engine.words.length,
	});

	const onTranslationChoice = useCallback(
		(wordIdx: number, transIdx: number) => {
			if (status.isTried) return;

			const word = engine.words[wordIdx];
			const chosenTranslation = word.choices[transIdx];

			if (word.correctTranslation.name === chosenTranslation.name) {
				speak(word.correctTranslation.name, langToBCP(word.correctTranslation.language));

				setCorrect(transIdx);

				return;
			}

			setTried(transIdx);
		},
		[status],
	);

	return (
		<>
			{engine.words[status.currentIndex] && (
				<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
					<Word name={engine.words[status.currentIndex].word}>
						<span css={styles.timer(status.timer)}>{status.timer}</span>
					</Word>
				</div>
			)}

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
				{Boolean(engine.words[status.currentIndex]) &&
                    engine.words[status.currentIndex].choices.map((item: TranslationWithID, i: number) => (
                    	<p
                    		onClick={() => onTranslationChoice(status.currentIndex, i)}
                    		css={[
                    			styles.item,
                    			status.isTried && status.isCorrect && status.chosenIndex === i
                    				? styles.correctItem
                    				: undefined,
                    			status.isTried && !status.isCorrect && status.chosenIndex === i
                    				? styles.incorrectItem
                    				: undefined,
                    		]}
                    		key={item.id}>
                    		{item.name}
                    	</p>
                    ))}
			</div>

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				{status.isTried && status.isCorrect && <Success />}
			</div>
		</>
	);
}
