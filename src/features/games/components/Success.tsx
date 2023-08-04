import * as styles from '@/styles/games/Success.styles';

export function Success() {
	return (
		<svg css={styles.root} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<circle css={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
			<path css={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
		</svg>
	);
}
