import {getAuth, signOut} from '@firebase/auth';
import {Button} from '@mantine/core';
import {useRouter} from 'next/navigation';
import { Link, useLocation } from 'react-router-dom';
import * as styles from '@/styles/shared/navigation/Root.styles';

export function Navigation() {
	const location = useLocation();
	const {push} = useRouter();

	return (
		<nav css={styles.root}>
			<Link css={styles.item(location.pathname.includes('languages'))} to="/admin/languages">
                Languages
			</Link>
			<Link css={styles.item(location.pathname.includes('decks'))} to="/admin/decks">
                Decks
			</Link>
			<Link css={styles.item(location.pathname.includes('cards'))} to="/admin/cards">
                Cards
			</Link>
			<Link css={styles.item(location.pathname.includes('games'))} to="/admin/games">
                Games
			</Link>
			<Button onClick={async () => {
				const auth = getAuth();
				try {
					await signOut(auth);
					push('/');
				} catch {
					// nothing
				}
			}}>
				Logout
			</Button>
		</nav>
	);
}
