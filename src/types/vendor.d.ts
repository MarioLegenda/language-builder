interface MutationArguments<T, K> {
    onError?: (error: unknown) => void;
    onSuccess?: (data: T, variables?: K) => void;
}

interface DeleteDocument {
    path: string;
    segment: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
interface FirestoreModel<T extends import('@firebase/firestore').DocumentData> {
    segment: string;
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    model: import('@firebase/firestore').WithFieldValue<T>;
}
