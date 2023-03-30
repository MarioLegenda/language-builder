import { Button, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    createTo: string;
    title: string;
}

export function Header({ createTo, title }: Props) {
	return (
		<div
			css={[
				utilStyles.flex('space-between'),
				utilStyles.spacing('bottom', 64),
				utilStyles.padding(0, 0, 12, 0),
				utilStyles.divider,
			]}>
			<Title order={2}>{title}</Title>

			<Button to={createTo} component={Link}>
                Create
			</Button>
		</div>
	);
}
