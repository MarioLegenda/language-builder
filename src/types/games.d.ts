interface PickOneEngine {
    deck: Deck;
    words: PickOneEngineWord[];
}

interface PickOneEngineWord {
    word: string;
    choices: Translation[];
    correctTranslation: Translation;
}

interface AnswerStatus {
    isCorrect: boolean;
    isTried: boolean;
    idx: number | null;
}
