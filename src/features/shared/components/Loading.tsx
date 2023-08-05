import { Loader } from '@mantine/core';
import * as styles from '@/styles/shared/Loading.styles';
import type { SerializedStyles } from '@emotion/react';
import type { MantineNumberSize } from '@mantine/core';

interface Props {
    visible: boolean;
    customStyles?: SerializedStyles | SerializedStyles[];
    size?: MantineNumberSize;
}
export function Loading({ visible, customStyles, size = 'sm' }: Props) {
	return (
		<>
			{visible && (
				<div css={[styles.root, customStyles]}>
					<Loader size={size} />
				</div>
			)}
		</>
	);
}
