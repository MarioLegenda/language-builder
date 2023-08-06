interface PickOneEngine {
    deck: Deck;
    words: PickOneEngineWord[];
}

interface PickOneEngineWord {
    word: string;
    choices: TranslationWithID[];
    correctTranslation: TranslationWithID;
}

interface AnswerStatus {
    isCorrect: boolean;
    isTried: boolean;
    idx: number | null;
}

interface ClubRandomEngine {
    words: PickOneEngineWord[];
}
