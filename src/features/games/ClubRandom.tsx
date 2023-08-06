import { Button, Card, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { GameHeader } from '@/features/games/components/GameHeader';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function ClubRandom() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(6), utilStyles.overflow('inherit'), utilStyles.resizeOn(680, 12)]}>
			<GameHeader title="Club random" />

			<Form
				validateInputOnChange={true}
				initialValues={{
					num: '',
				}}
				validate={{
					num: (value: string) => requiredAndLimited('deck', value, 1, 2000),
				}}
				onSubmit={(data) => {
					navigate(`/admin/games/club-random/${data.num}`);
				}}
				fields={(form) => (
					<>
						<TextInput
							label="Number of decks"
							placeholder="Type your number"
							{...form.getInputProps('num')}
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
