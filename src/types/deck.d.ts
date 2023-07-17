interface Deck {
    id: number;
    name: string;
    language: string;
}

interface CreateDeckForm {
    name: string;
    language: string;
    id?: number;
}

interface EditDeckForm {
    name: string | undefined;
    language: string | undefined;
}
