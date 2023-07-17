interface Deck {
    id: number;
    name: string;
    language: string;
}

interface CreateDeckForm {
    name: string;
    language: string;
}

interface EditDeckForm {
    name: string | undefined;
    language: string | undefined;
}
