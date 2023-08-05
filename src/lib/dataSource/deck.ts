import {Storage} from './storage';
class ThisStore<T> extends Storage<T> {}

export const DeckStore = new ThisStore<Deck>('decks');
