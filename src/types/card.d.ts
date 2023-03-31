interface Card {
    name: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: Translation[];
}

interface Translation {
    word: string;
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}

interface CreateCardForm {
    name: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: CreateTranslationForm[];
}

interface CreateTranslationForm {
    word: string;
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}

interface EditCardForm {
    name: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: EditTranslationForm[];
}

interface EditTranslationForm {
    word: string;
    name: string;
    language: string;
    hint: string;
    type: string;
    gender: string;
    example: string;
    isMain: boolean;
}
