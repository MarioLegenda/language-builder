import { Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Translation } from '@/features/games/engine/justShowMe/Translation';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onDone: () => void;
    engine: Card[];
}
export function Item({ engine, onDone }: Props) {
	const [index, setIndex] = useState<number>(0);
	const params = useParams();
	const isInfinite = Boolean(params.infinite);

	useEffect(() => {
		if (index === engine.length) {
			if (isInfinite) {
				setIndex(0);

				return;
			}

			onDone();
		}
	}, [index, isInfinite]);

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
					{engine[index] &&
                        engine[index].translations.map((item, i) => <Translation key={i} translation={item} />)}
				</div>

				<div css={utilStyles.column(12)}>
					<Group position="right">
						<Button
							onClick={() => {
								setIndex((i) => i + 1);
							}}>
                            Continue
						</Button>
					</Group>
				</div>
			</div>
		</>
	);
}
