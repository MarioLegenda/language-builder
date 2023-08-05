import { Button, Card, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {GameHeader} from '@/features/games/components/GameHeader';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function LetMeGuess() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(6), utilStyles.overflow('inherit'), utilStyles.resizeOn(680, 12)]}>
			<GameHeader game="let-me-guess" title="Let me guess" />

			<Form
				validateInputOnChange={true}
				initialValues={{
					deck: '',
				}}
				validate={{
					deck: (value: string) => requiredAndLimited('deck', value, 1, 200),
				}}
				onSubmit={(data) => {
					navigate(`/admin/games/let-me-guess/${data.deck}`);
				}}
				fields={(form) => (
					<>
						<DeckDropdown topLevelForm={form} name="deck" />

						<Button
							type="submit"
							disabled={!form.isValid()}
							fullWidth
							variant="light"
							color="blue"
							mt="md"
							radius="md">
                            Play
						</Button>
					</>
				)}
			/>
		</Card>
	);
}
