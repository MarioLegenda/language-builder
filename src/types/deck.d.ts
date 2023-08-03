interface Deck {
    id?: string;
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
type CardWithID = Card & WithID;
