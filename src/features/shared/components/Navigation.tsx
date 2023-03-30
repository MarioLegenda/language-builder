import { Link, useLocation } from 'react-router-dom';
import * as styles from '@/styles/shared/navigation/Root.styles';

export function Navigation() {
	const location = useLocation();

	return (
		<nav css={styles.root}>
			<Link css={styles.item(location.pathname.includes('languages'))} to="/languages">
                Languages
			</Link>
			<Link css={styles.item(location.pathname.includes('decks'))} to="/decks">
                Decks
			</Link>
			<Link css={styles.item(location.pathname.includes('cards'))} to="/cards">
                Cards
			</Link>
			<Link css={styles.item(location.pathname.includes('games'))} to="/games">
                Games
			</Link>
		</nav>
	);
}
