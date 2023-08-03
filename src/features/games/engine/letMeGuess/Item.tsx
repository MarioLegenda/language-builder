import { Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Translation } from '@/features/games/engine/justShowMe/Translation';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onDone: () => void;
    engine: Card[];
}
export function Item({ engine, onDone }: Props) {
	const [index, setIndex] = useState<number>(0);
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		if (index === engine.length) {
			onDone();
		}
	}, [index]);

	const translations = engine[index] && engine[index].translationsArray ? engine[index].translationsArray : [];

	return (
		<>
			<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 64)]}>
				<Title align="center" order={1}>
					{engine[index] && engine[index].word}
				</Title>
			</div>

			<div
				css={[
					utilStyles.column(12),
					utilStyles.flex('space-between', 'auto', 'flex-start'),
					utilStyles.fullWidth,
				]}>
				<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
					{isShown &&
                        engine[index] && translations &&
                        translations.map((item, i) => <Translation key={i} translation={item} />)}
				</div>

				<div css={utilStyles.column(12)}>
					{!isShown && (
						<Group position="right">
							<Button onClick={() => setIsShown(true)}>Show me</Button>
						</Group>
					)}

					{isShown && (
						<Group position="right">
							<Button
								onClick={() => {
									setIndex((i) => i + 1);
									setIsShown(false);
								}}>
                                Continue
							</Button>
						</Group>
					)}
				</div>
			</div>
		</>
	);
}
