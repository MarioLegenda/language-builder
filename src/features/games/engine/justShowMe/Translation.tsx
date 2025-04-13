import * as styles from '@/styles/games/JustShowMe.styles';

interface Props {
    translation: Translation;
}
export function Translation({ translation }: Props) {
	return (
		<div css={styles.root}>
			<h1 css={styles.heading}>
				{translation.isMain && <span css={styles.isMain} />}
				{translation.name}
			</h1>
		</div>
	);
}
