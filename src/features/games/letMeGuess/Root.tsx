import { Button, Group } from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '@/features/games/engine/letMeGuess/Item';
import { createEngine } from '@/features/games/engine/letMeGuess/engine';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const { deckId } = useParams();
	const [decks, setDecks] = useState(createEngine(deckId as string));
	const [isDone, setIsDone] = useState(false);

	return (
		<div css={[utilStyles.grid]}>
			{!isDone && <Item onDone={() => setIsDone(true)} engine={decks} />}

			{isDone && (
				<div css={utilStyles.column(12)}>
					<Group position="center">
						<Button
							onClick={() => {
								setIsDone(false);
								setDecks(createEngine(deckId as string));
							}}>
                            Try again
						</Button>
					</Group>
				</div>
			)}
		</div>
	);
}
