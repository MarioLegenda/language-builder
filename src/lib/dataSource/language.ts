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
	remove(id: string) {
		delete this.store[id];
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
	update(id: string, item: T): void {
		if (!this.has(id)) throw new Error(`Item with ID ${id} does not exist.`);

		this.set(id, item);
	}
	persist() {
		localStorage.setItem(this.key, JSON.stringify(this.store));
	}
}

export const LanguageStore = new ThisStore<Language>();
