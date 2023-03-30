import * as styles from '@/styles/languages/Root.styles';
import type { PropsWithChildren } from 'react';

export function ContentElement({ children }: PropsWithChildren) {
	return <div css={styles.root}>{children}</div>;
}
