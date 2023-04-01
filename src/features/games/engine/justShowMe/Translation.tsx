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

			<p>
				<span css={styles.example}>Example:</span> <span>{translation.example}</span>
			</p>
			<p>
				<span css={styles.example}>Type:</span> <span>{translation.type}</span>
			</p>
			<p>
				<span css={styles.example}>Gender:</span> <span>{translation.gender}</span>
			</p>
		</div>
	);
}
