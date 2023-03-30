import { Button, Group } from '@mantine/core';
import type { ButtonProps, GroupProps } from '@mantine/core';
import type {PropsWithChildren} from 'react';

interface Props {
    group?: GroupProps;
    button?: ButtonProps;
}

export function SubmitButton({ group, button, children }: Props & PropsWithChildren) {
	return (
		<Group {...group}>
			<Button {...button} type="submit">
				{children}
			</Button>
		</Group>
	);
}
