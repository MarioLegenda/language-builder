import { Button, Card, Checkbox, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { GameHeader } from '@/features/games/components/GameHeader';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function TimeEscapeItem() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(6), utilStyles.overflow('inherit'), utilStyles.resizeOn(680, 12)]}>
			<GameHeader title="Time escape" game="time-escape" />

			<Form
				validateInputOnChange={true}
				initialValues={{
					deck: '',
					timer: '4',
					allDecks: false,
				}}
				validate={{
					deck: (value: string) => requiredAndLimited('deck', value, 1, 200),
					timer: (value: string) => {
						const int = parseInt(value);
						if (isNaN(int)) {
							return 'timer value must be a number';
						}

						if (int < 3) {
							return 'timer value must be higher than 3 seconds';
						}
					},
				}}
				onSubmit={(data) => {
					navigate(
						`/admin/games/time-escape/${data.deck}/${data.timer}${
							data.allDecks ? '/all-decks' : '/single-deck'
						}`,
					);
				}}
				fields={(form) => (
					<>
						<DeckDropdown css={utilStyles.spacing('bottom', 12)} topLevelForm={form} name="deck" />
						<Checkbox
							css={[utilStyles.spacing('bottom', 12), utilStyles.spacing('top', 12)]}
							label="All decks?"
							{...form.getInputProps('allDecks')}
						/>
						<TextInput
							label="Interval in seconds"
							placeholder="Type your seconds..."
							{...form.getInputProps('timer')}
							name="timer"
						/>

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
