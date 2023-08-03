interface Card {
    id?: string;
    word: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: {
        [key: string]: Translation;
    };
    createdAt?: Date;
    updatedAt?: Date | null;
}

type Translations = {
    [key: string]: Translation;
};

interface Translation {
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}

interface CreateCardForm {
    word: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: CreateTranslationForm[];
}

interface CreateTranslationForm {
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}

interface EditCardForm {
    word: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: EditTranslationForm[];
}

interface EditTranslationForm {
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}
