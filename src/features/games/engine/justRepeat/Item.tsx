import { Button, Group, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Success } from '@/features/games/components/Success';
import {langToBCP, speak} from '@/features/games/engine/util';
import * as styles from '@/styles/games/PickOne.styles';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onDone: () => void;
    engine: PickOneEngine;
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
				speak(word.correctTranslation.name, langToBCP(word.correctTranslation.language), () => {
					setStatus({
						isTried: true,
						isCorrect: true,
						idx: transIdx,
					});
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
				<Title align="center" order={1}>
					{engine.words[index].word}
				</Title>
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
							disabled={!status.isCorrect}
							onClick={() => {
								setIndex((idx) => idx + 1);
								setStatus({
									isCorrect: false,
									isTried: false,
									idx: null,
								});
							}}>
                            Next
						</Button>
					</Group>
				</div>
			)}
		</>
	);
}
