import { Link } from 'react-router-dom';
import * as styles from '@/styles/shared/navigation/Root.styles';

export function Navigation() {
	return (
		<nav css={styles.root}>
			<Link css={styles.item} to="/languages">
                Languages
			</Link>
			<Link css={styles.item} to="/decks">
                Decks
			</Link>
			<Link css={styles.item} to="/cards">
                Cards
			</Link>
			<Link css={styles.item} to="/games">
                Games
			</Link>
		</nav>
	);
}
