import * as styles from '@/styles/games/Word.styles';
import type { PropsWithChildren } from 'react';

interface Props {
    name: string;
}

export function Word({ name, children }: Props & PropsWithChildren) {
	return (
		<div css={styles.root}>
			<h1 css={styles.heading}>{name}</h1>
			<h1 css={styles.heading}>{children}</h1>
		</div>
	);
}
