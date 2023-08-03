import { Button, Card, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { Form } from '@/features/shared/components/forms/Form';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function PickOneItem() {
	const navigate = useNavigate();

	return (
		<Card shadow="sm" css={[utilStyles.column(4), utilStyles.overflow('inherit')]}>
			<Title order={4} align="center" css={utilStyles.spacing('bottom', 64)}>
                Pick one
			</Title>

			<Form
				validateInputOnChange={true}
				initialValues={{
					deck: '',
				}}
				validate={{
					deck: (value: string) => requiredAndLimited('deck', value, 1, 200),
				}}
				onSubmit={(data) => {
					navigate(`/admin/games/pick-one/${data.deck}`);
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
