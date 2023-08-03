import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root as CreateCardRoot } from '@/features/cards/create/Root';
import { Root as CardsRoot } from '@/features/cards/list/Root';
import { Root as CreateDeckRoot } from '@/features/decks/create/Root';
import { Root as EditDeckRoot } from '@/features/decks/edit/Root';
import { Root as DecksRoot } from '@/features/decks/list/Root';
import { Root as GamesRoot } from '@/features/games/Root';
import { Root as JustRepeat } from '@/features/games/justRepeat/Root';
import { Root as JustShowMe } from '@/features/games/justShowMe/Root';
import { Root as LetMeGuess } from '@/features/games/letMeGuess/Root';
import { Root as PickOneRoot } from '@/features/games/pickOne/Root';
import { Root as TimeEscapeRoot } from '@/features/games/timeEscape/Root';
import { Root as CreateLanguageRoot } from '@/features/languages/create/Root';
import { Root as EditLanguageRoot } from '@/features/languages/edit/Root';
import { Root as LanguageRoot } from '@/features/languages/list/Root';
import { Layout } from '@/features/shared/Layout';
import { Content } from '@/features/shared/components/Content';
import { Navigation } from '@/features/shared/components/Navigation';
import { Auth } from '@/lib/auth/auth';
import { authChangeListener } from '@/lib/dataSource/firebase/authChangeListener';
import { initializeFirebase } from '@/lib/dataSource/firebase/firebase';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { useGetAll } from '@/lib/dataSource/firebase/useGetAll';
import { useCard } from '@/lib/dataSource/hooks/useCard';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';
import { isCard } from '@/lib/dataSource/typeCheck/isCard';
import { isDeck } from '@/lib/dataSource/typeCheck/isDeck';
import { useRunInBrowser } from '@/lib/helpers/useRunInBrowser';

export default function Home() {
	const isBrowser = useRunInBrowser();
	const [isReady, setIsReady] = useState(false);
	const getAllDecks = useGetAll<DeckWithID>();
	const getAllCards = useGetAll<CardWithID>();
	const { store: deckStore } = useDeck();
	const { store: cardStore } = useCard();

	useEffect(() => {
		if (isBrowser && Auth.isAuthenticated()) {
			initializeFirebase();
			authChangeListener({
				onSuccess() {
					Promise.allSettled([
						getAllDecks(FirestoreMetadata.deckCollection.name),
						getAllCards(FirestoreMetadata.cardsCollection.name),
					]).then((data) => {
						for (const item of data) {
							if (item.status === 'fulfilled' && isDeck(item.value)) {
								for (const part of item.value) {
									deckStore.set(part.id, part);
								}

								deckStore.persist();
							}

							if (item.status === 'fulfilled' && isCard(item.value)) {
								for (const part of item.value) {
									cardStore.set(part.id, part);
								}

								cardStore.persist();
							}
						}

						setIsReady(true);
					});
				},
				onError() {
					console.error('FUCK OFF');
					Auth.logout();
				},
			});
		}
	}, [isBrowser]);

	return (
		<>
			<main>
				{isBrowser && isReady && (
					<BrowserRouter>
						<Routes>
							<Route path="/admin" element={<Layout navigation={<Navigation />} content={<Content />} />}>
								<Route path="/admin/languages" element={<LanguageRoot />} />
								<Route path="/admin/decks" element={<DecksRoot />} />
								<Route path="/admin/cards" element={<CardsRoot />} />
								<Route path="/admin/games" element={<GamesRoot />} />

								<Route path="/admin/games/pick-one/:deckId" element={<PickOneRoot />} />
								<Route path="/admin/games/time-escape/:deckId/:timer" element={<TimeEscapeRoot />} />
								<Route path="/admin/games/just-show-me/:deckId/:infinite" element={<JustShowMe />} />
								<Route path="/admin/games/just-show-me/:deckId" element={<JustShowMe />} />
								<Route path="/admin/games/let-me-guess/:deckId" element={<LetMeGuess />} />
								<Route path="/admin/games/just-repeat/:deckId/:shuffle" element={<JustRepeat />} />

								<Route path="/admin/languages/create" element={<CreateLanguageRoot />} />
								<Route path="/admin/languages/edit/:id" element={<EditLanguageRoot />} />

								<Route path="/admin/cards/create" element={<CreateCardRoot />} />
								<Route path="/admin/cards/edit/:id" element={<CreateCardRoot />} />

								<Route path="/admin/decks/create" element={<CreateDeckRoot />} />
								<Route path="/admin/decks/edit/:id" element={<EditDeckRoot />} />
							</Route>
						</Routes>
					</BrowserRouter>
				)}
			</main>
		</>
	);
}
