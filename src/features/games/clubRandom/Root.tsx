import { Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Item } from '@/features/games/engine/clubRandom/Item';
import { useEngine } from '@/features/games/engine/clubRandom/useEngine';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const { engine, reset } = useEngine();
	const [isDone, setIsDone] = useState(false);

	return (
		<div css={[utilStyles.grid]}>
			{!isDone && <Item onDone={() => setIsDone(true)} engine={engine} />}

			{isDone && (
				<div css={utilStyles.column(12)}>
					<Group position="center">
						<Button
							onClick={() => {
								reset();
								setIsDone(false);
							}}>
                            Try again
						</Button>
					</Group>
				</div>
			)}
		</div>
	);
}
