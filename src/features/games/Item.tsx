import { Button, Card, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeckDropdown } from '@/features/shared/components/DeckDropdown';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    route: string;
}

export function Item({ route }: Props) {
	const navigate = useNavigate();
	const [deck, setDeck] = useState<string>();

	const onPlay = useCallback(() => {
		navigate(`/games/${route}/${deck}`);
	}, [deck]);

	return (
		<Card shadow="sm" css={utilStyles.column(6)}>
			<Title order={4} align="center" css={utilStyles.spacing('bottom', 64)}>
                Pick one
			</Title>

			<DeckDropdown onChange={(deck) => setDeck(deck)} />

			<Button disabled={!deck} onClick={onPlay} fullWidth variant="light" color="blue" mt="md" radius="md">
                Play
			</Button>
		</Card>
	);
}
