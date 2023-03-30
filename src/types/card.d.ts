interface Card {
    name: string;
    deck: string;
    fromLanguage: string;
    toLanguage: string;
    translations: Translation[];
}

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
    name: string;
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
    name: string;
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
