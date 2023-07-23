import { Loader } from '@mantine/core';
import * as styles from '@/styles/shared/Loading.styles';

interface Props {
    visible: boolean;
}
export function Loading({ visible }: Props) {
	return (
		<>
			{visible && (
				<div css={styles.root}>
					<Loader size="sm" />
				</div>
			)}
		</>
	);
}
