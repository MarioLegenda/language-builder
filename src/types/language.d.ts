interface Language {
    name: string;
    shortName: string;
    createdAt: Date;
    updatedAt: Date | null;
}

interface CreateLanguageForm {
    name: string;
    shortName: string;
}

interface EditLanguageForm {
    name: string;
    shortName: string;
}
