type Store<T> = Record<string, T>;

interface DataSource<T> {
    set(id: string, item: T): void;
    remove(id: string): void;
    get(id: string): T;
    list(): T[];
    paginate(offset: number, limit: number): T[];
    has(id: string): boolean;
    persist(): void;
    count(): number;
    all(): Store<T>;
    findBy(filterFn: (item: T, idx: number) => void): T[];
    update(oldId: string, newId: string, item: T);
}
