import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { useGetAll } from '@/lib/dataSource/firebase/useGetAll';
import { useCard } from '@/lib/dataSource/hooks/useCard';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';
import { isCard } from '@/lib/dataSource/typeCheck/isCard';
import { isDeck } from '@/lib/dataSource/typeCheck/isDeck';

export function useLoadIntoLocalStorage() {
	const getAllDecks = useGetAll<DeckWithID>();
	const getAllCards = useGetAll<CardWithID>();
	const { store: deckStore } = useDeck();
	const { store: cardStore } = useCard();

	return (onSuccess: VoidFn) => {
		Promise.allSettled([
			getAllDecks(FirestoreMetadata.deckCollection.name),
			getAllCards(FirestoreMetadata.cardsCollection.name),
		]).then((data) => {
			deckStore.clear();
			cardStore.clear();
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

			onSuccess();
		});
	};
}
