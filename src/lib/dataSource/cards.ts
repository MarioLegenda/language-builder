import { Storage } from './storage';

class ThisStore<T> extends Storage<T> {}

export const CardStore = new ThisStore<Card>('cards');
