class ThisStore<T> implements DataSource<T> {
	private key = 'languages';
	private store: Store<T>;
	constructor() {
		if (typeof localStorage === 'undefined') {
			this.store = {};

			return;
		}

		const items = localStorage.getItem(this.key);
		if (!items) {
			localStorage.setItem(this.key, JSON.stringify({}));
		}

		this.store = JSON.parse(localStorage.getItem(this.key) as string) as Store<T>;
	}
	set(id: string, item: T): void {
		this.store[id] = item;
	}
	findBy(filterFn: (item: T, idx: number) => void): T[] {
		return Object.values(this.all()).filter(filterFn);
	}
	all(): Store<T> {
		return this.store;
	}
	remove(id: string) {
		delete this.store[id];
	}
	removeBy(filterFn: (item: T, idx: number) => void) {
		const cards = Object.values(this.store).filter(filterFn) as Card[];

		for (const card of cards) {
			this.remove(card.id as string);
		}
	}
	get(id: string): T {
		return this.store[id];
	}
	list(): T[] {
		return Object.values(this.store);
	}
	paginate(offset: number, limit: number): T[] {
		const values = Object.values(this.store);

		return values.slice((offset - 1) * limit, (offset - 1) * limit + limit);
	}
	count(): number {
		return Object.values(this.store).length;
	}
	has(id: string) {
		return Boolean(this.get(id));
	}
	update(oldId: string, newId: string, item: T): void {
		this.remove(oldId);
		this.set(newId, item);
	}
	persist() {
		localStorage.setItem(this.key, JSON.stringify(this.store));
	}

	clear() {
		// NOOP OPERATION
	}
}

export const LanguageStore = new ThisStore<Language>();
