import { Button, Group } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Success } from '@/features/games/components/Success';
import { Word } from '@/features/games/components/Word';
import * as styles from '@/styles/games/PickOne.styles';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onDone: () => void;
    engine: ClubRandomEngine;
}
export function Item({ engine, onDone }: Props) {
	const [index, setIndex] = useState<number>(0);
	const [status, setStatus] = useState<{ isCorrect: boolean; isTried: boolean; idx: number | null }>({
		isCorrect: false,
		isTried: false,
		idx: null,
	});

	const onTranslationChoice = useCallback(
		(wordIdx: number, transIdx: number) => {
			if (status.isTried && status.isCorrect) return;

			const word = engine.words[wordIdx];
			const chosenTranslation = word.choices[transIdx];

			if (word.correctTranslation.name === chosenTranslation.name) {
				setStatus({
					isTried: true,
					isCorrect: true,
					idx: transIdx,
				});

				return;
			}

			setStatus({
				isTried: true,
				isCorrect: false,
				idx: transIdx,
			});
		},
		[status],
	);

	if (index === engine.words.length) {
		onDone();

		return null;
	}

	return (
		<>
			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				<Word name={engine.words[index].word} />
			</div>

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
				{engine.words[index].choices.map((item: TranslationWithID, i: number) => (
					<Button
						variant="outline"
						onClick={() => onTranslationChoice(index, i)}
						css={[
							styles.item,
							status.isTried && status.isCorrect && status.idx === i ? styles.correctItem : undefined,
							status.isTried && !status.isCorrect && status.idx === i ? styles.incorrectItem : undefined,
						]}
						key={item.id}>
						{item.name}
					</Button>
				))}
			</div>

			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				{status.isTried && status.isCorrect && <Success />}
			</div>

			{status.isCorrect && (
				<div css={utilStyles.column(12)}>
					<Group position="center">
						<Button
							size="xl"
							onClick={() => {
								setStatus({
									isCorrect: false,
									isTried: false,
									idx: null,
								});
								setIndex((idx) => idx + 1);
							}}>
                            Next
						</Button>
					</Group>
				</div>
			)}
		</>
	);
}
