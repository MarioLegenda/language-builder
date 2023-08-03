import { Button, Card, Checkbox, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function JustRepeat() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(6), utilStyles.overflow('inherit'), utilStyles.resizeOn(680, 12)]}>
			<Title order={4} align="center" css={utilStyles.spacing('bottom', 64)}>
                Just repeat
			</Title>

			<Form
				validateInputOnChange={true}
				initialValues={{
					deck: '',
					shuffle: false,
				}}
				validate={{
					deck: (value: string) => requiredAndLimited('deck', value, 1, 200),
				}}
				onSubmit={(data) => {
					navigate(`/admin/games/just-repeat/${data.deck}${data.shuffle ? '/shuffle' : '/no-shuffle'}`);
				}}
				fields={(form) => (
					<>
						<DeckDropdown topLevelForm={form} name="deck" />

						<Checkbox
							css={[utilStyles.spacing('bottom', 12), utilStyles.spacing('top', 12)]}
							label="Shuffle?"
							{...form.getInputProps('shuffle')}
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
