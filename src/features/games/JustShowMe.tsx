import { Button, Card, Checkbox } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { GameHeader } from '@/features/games/components/GameHeader';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function JustShowMe() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(6), utilStyles.overflow('inherit'), utilStyles.resizeOn(680, 12)]}>
			<GameHeader game="just-show-me" title="Just show me" />

			<Form
				validateInputOnChange={true}
				initialValues={{
					deck: '',
					infinite: false,
				}}
				validate={{
					deck: (value: string) => requiredAndLimited('deck', value, 1, 200),
				}}
				onSubmit={(data) => {
					navigate(`/admin/games/just-show-me/${data.deck}${data.infinite ? '/infinite' : ''}`);
				}}
				fields={(form) => (
					<>
						<DeckDropdown topLevelForm={form} name="deck" />

						<Checkbox
							css={[utilStyles.spacing('bottom', 12), utilStyles.spacing('top', 12)]}
							label="Infinite?"
							{...form.getInputProps('infinite')}
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
