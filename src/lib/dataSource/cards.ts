class ThisStore<T> implements DataSource<T> {
	private key = 'cards';
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

		this.store = (JSON.parse(localStorage.getItem(this.key) as string) as Store<T>) || {};
	}
	set(id: string, item: T): void {
		this.store[id] = item;
	}
	remove(id: string) {
		delete this.store[id];
	}
	all(): Store<T> {
		return this.store;
	}
	get(id: string): T {
		return this.store[id];
	}
	list(): T[] {
		return Object.values(this.store);
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
}

export const CardStore = new ThisStore<Card>();