import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root as CreateCardRoot } from '@/features/cards/create/Root';
import { Root as CardsRoot } from '@/features/cards/list/Root';
import { Root as CreateDeckRoot } from '@/features/decks/create/Root';
import { Root as EditDeckRoot } from '@/features/decks/edit/Root';
import { Root as DecksRoot } from '@/features/decks/list/Root';
import { Root as GamesRoot } from '@/features/games/Root';
import { Root as ClubRandom } from '@/features/games/clubRandom/Root';
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
import { useInitApp } from '@/lib/dataSource/useInitApp';

export default function Home() {
	const [isReady, setIsReady] = useState(false);
	useInitApp(() => setIsReady(true));

	return (
		<>
			<main>
				{isReady && (
					<BrowserRouter>
						<Routes>
							<Route path="/admin" element={<Layout navigation={<Navigation />} content={<Content />} />}>
								<Route path="/admin/languages" element={<LanguageRoot />} />
								<Route path="/admin/decks" element={<DecksRoot />} />
								<Route path="/admin/cards" element={<CardsRoot />} />
								<Route path="/admin/games" element={<GamesRoot />} />

								<Route
									path="/admin/games/pick-one/:deckId/:shuffle/:allDecks"
									element={<PickOneRoot />}
								/>
								<Route
									path="/admin/games/time-escape/:deckId/:timer/:allDecks"
									element={<TimeEscapeRoot />}
								/>
								<Route path="/admin/games/just-show-me/:deckId/:infinite" element={<JustShowMe />} />
								<Route path="/admin/games/just-show-me/:deckId" element={<JustShowMe />} />
								<Route path="/admin/games/let-me-guess/:deckId" element={<LetMeGuess />} />
								<Route
									path="/admin/games/just-repeat/:deckId/:shuffle/:allDecks"
									element={<JustRepeat />}
								/>

								<Route path="/admin/games/club-random/:num" element={<ClubRandom />} />

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
