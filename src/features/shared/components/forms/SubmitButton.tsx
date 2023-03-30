import { Button, Group } from '@mantine/core';
import type { ButtonProps, GroupProps } from '@mantine/core';

interface Props {
    group?: GroupProps;
    button?: ButtonProps;
}

export function SubmitButton({ group, button }: Props) {
	return (
		<Group {...group}>
			<Button {...button} type="submit">
                Create
			</Button>
		</Group>
	);
}
