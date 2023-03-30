import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root as CreateDeckRoot } from '@/features/decks/create/Root';
import { Root as DecksRoot } from '@/features/decks/list/Root';
import { Root as CreateLanguageRoot } from '@/features/languages/create/Root';
import { Root as LanguageRoot } from '@/features/languages/list/Root';
import { Layout } from '@/features/shared/Layout';
import { Content } from '@/features/shared/components/Content';
import { Navigation } from '@/features/shared/components/Navigation';
import { useRunInBrowser } from '@/lib/helpers/useRunInBrowser';

export default function Home() {
	const isBrowser = useRunInBrowser();

	return (
		<>
			<main>
				{isBrowser && (
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout navigation={<Navigation />} content={<Content />} />}>
								<Route path="/languages" element={<LanguageRoot />} />
								<Route path="/decks" element={<DecksRoot />} />

								<Route path="/languages/create" element={<CreateLanguageRoot />} />
								<Route path="/decks/create" element={<CreateDeckRoot />} />
								<Route path="/decks/edit/:id" element={<CreateDeckRoot isUpdate />} />
								<Route path="/languages/edit/:id" element={<CreateLanguageRoot isUpdate />} />
							</Route>
						</Routes>
					</BrowserRouter>
				)}
			</main>
		</>
	);
}
