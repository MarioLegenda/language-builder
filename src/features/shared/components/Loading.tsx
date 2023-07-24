import { Loader } from '@mantine/core';
import * as styles from '@/styles/shared/Loading.styles';
import type { SerializedStyles } from '@emotion/react';

interface Props {
    visible: boolean;
    customStyles?: SerializedStyles | SerializedStyles[];
}
export function Loading({ visible, customStyles }: Props) {
	return (
		<>
			{visible && (
				<div css={[styles.root, customStyles]}>
					<Loader size="sm" />
				</div>
			)}
		</>
	);
}
