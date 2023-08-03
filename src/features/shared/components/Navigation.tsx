import { getAuth, signOut } from '@firebase/auth';
import {Burger, Button, Drawer} from '@mantine/core';
import { useRouter } from 'next/navigation';
import {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as styles from '@/styles/shared/navigation/Root.styles';

export function Navigation() {
	const location = useLocation();
	const { push } = useRouter();

	const [menuOpened, setMenuOpened] = useState(false);

	const onClick = () => setMenuOpened(false);

	return (
		<>
			<Burger opened={menuOpened} onClick={() => setMenuOpened((item) => !item)} aria-label={'Menu'} />
			
			<Drawer opened={menuOpened} onClose={onClick}>
				<nav css={styles.root}>
					<Link onClick={onClick} css={styles.item(location.pathname.includes('languages'))} to="/admin/languages">
						Languages
					</Link>
					<Link onClick={onClick} css={styles.item(location.pathname.includes('decks'))} to="/admin/decks">
						Decks
					</Link>
					<Link onClick={onClick} css={styles.item(location.pathname.includes('cards'))} to="/admin/cards">
						Cards
					</Link>
					<Link onClick={onClick} css={styles.item(location.pathname.includes('games'))} to="/admin/games">
						Games
					</Link>
					<Button
						onClick={async () => {
							const auth = getAuth();
							try {
								await signOut(auth);
								onClick();
								push('/');
							} catch {
								// nothing
							}
						}}>
						Logout
					</Button>
				</nav>
			</Drawer>
		</>
	);
}
