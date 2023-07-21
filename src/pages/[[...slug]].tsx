import {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root as CreateCardRoot } from '@/features/cards/create/Root';
import { Root as CardsRoot } from '@/features/cards/list/Root';
import { Root as CreateDeckRoot } from '@/features/decks/create/Root';
import { Root as DecksRoot } from '@/features/decks/list/Root';
import { Root as GamesRoot } from '@/features/games/Root';
import { Root as JustRepeat } from '@/features/games/justRepeat/Root';
import { Root as JustShowMe } from '@/features/games/justShowMe/Root';
import { Root as LetMeGuess } from '@/features/games/letMeGuess/Root';
import { Root as PickOneRoot } from '@/features/games/pickOne/Root';
import { Root as TimeEscapeRoot } from '@/features/games/timeEscape/Root';
import { Root as CreateLanguageRoot } from '@/features/languages/create/Root';
import { Root as LanguageRoot } from '@/features/languages/list/Root';
import { Layout } from '@/features/shared/Layout';
import { Content } from '@/features/shared/components/Content';
import { Navigation } from '@/features/shared/components/Navigation';
import {initializeFirebase} from '@/lib/dataSource/firebase';
import { useRunInBrowser } from '@/lib/helpers/useRunInBrowser';

export default function Home() {
	const isBrowser = useRunInBrowser();
	const [isReady, setIsReady] = useState(false);
	
	useEffect(() => {
		if (isBrowser) {
			initializeFirebase();
			setIsReady(true);
		}
	}, [isBrowser]);

	return (
		<>
			<main>
				{isBrowser && isReady && (
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout navigation={<Navigation />} content={<Content />} />}>
								<Route path="/languages" element={<LanguageRoot />} />
								<Route path="/decks" element={<DecksRoot />} />
								<Route path="/cards" element={<CardsRoot />} />
								<Route path="/games" element={<GamesRoot />} />

								<Route path="/games/pick-one/:deckId" element={<PickOneRoot />} />
								<Route path="/games/time-escape/:deckId/:timer" element={<TimeEscapeRoot />} />
								<Route path="/games/just-show-me/:deckId/:infinite" element={<JustShowMe />} />
								<Route path="/games/just-show-me/:deckId" element={<JustShowMe />} />
								<Route path="/games/let-me-guess/:deckId" element={<LetMeGuess />} />
								<Route path="/games/just-repeat/:deckId/:shuffle" element={<JustRepeat />} />

								<Route path="/languages/create" element={<CreateLanguageRoot />} />
								<Route path="/languages/edit/:id" element={<CreateLanguageRoot isUpdate />} />

								<Route path="/cards/create" element={<CreateCardRoot />} />
								<Route path="/cards/edit/:id" element={<CreateCardRoot isUpdate />} />

								<Route path="/decks/create" element={<CreateDeckRoot />} />
								<Route path="/decks/edit/:id" element={<CreateDeckRoot isUpdate />} />
							</Route>
						</Routes>
					</BrowserRouter>
				)}
			</main>
		</>
	);
}
