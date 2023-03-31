type Store<T> = Record<string, T>;

interface DataSource<T> {
    set(id: string, item: T): void;
    remove(id: string): void;
    get(id: string): T;
    list(): T[];
    has(id: string): boolean;
    persist(): void;
    all(): Store<T>;
    update(oldId: string, newId: string, item: T);
}
