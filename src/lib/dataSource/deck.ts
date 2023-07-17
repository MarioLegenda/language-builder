class ThisStore<T> implements DataSource<T> {
	private key = 'decks';
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
	count(): number {
		return Object.values(this.store).length;
	}
	paginate(offset: number, limit: number): T[] {
		const values = Object.values(this.store);

		return values.slice((offset - 1) * limit, (offset - 1) * limit + limit);
	}
	all(): Store<T> {
		return this.store;
	}
	remove(id: string) {
		delete this.store[id];
	}
	get(id: string): T {
		return this.store[id];
	}
	findBy(filterFn: (item: T, idx: number) => void): T[] {
		return Object.values(this.all()).filter(filterFn);
	}
	list(): T[] {
		return Object.values(this.store);
	}
	createNextID(): number {
		const list = this.list();

		if (list.length === 0) return 1;

		list.sort(function (a, b) {
			return (a as Deck).id - (b as Deck).id;
		});

		return (list[list.length - 1] as Deck).id + 1;
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

export const DeckStore = new ThisStore<Deck>();
