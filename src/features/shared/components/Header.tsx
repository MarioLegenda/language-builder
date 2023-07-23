import { Button, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Loading } from '@/features/shared/components/Loading';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    createTo: string;
    title: string;
    showLoading?: boolean;
}
export function Header({ createTo, title, showLoading = false }: Props) {
	return (
		<div
			css={[
				utilStyles.flex('space-between'),
				utilStyles.spacing('bottom', 64),
				utilStyles.padding(0, 0, 12, 0),
				utilStyles.divider,
			]}>
			<div css={[utilStyles.flex('space-between', '12px')]}>
				<Title order={2}>{title}</Title>
				<Loading visible={showLoading} />
			</div>

			<Button to={createTo} component={Link}>
                Create
			</Button>
		</div>
	);
}
