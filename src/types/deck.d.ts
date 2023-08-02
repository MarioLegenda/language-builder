interface Deck {
    name: string;
    language: string;

    createdAt?: Date;
    updatedAt?: Date | null;
}

interface CreateDeckForm {
    name: string;
    language: string;
}

interface EditDeckForm {
    name: string | undefined;
    language: string | undefined;
}

type DeckWithID = Deck & WithID;
