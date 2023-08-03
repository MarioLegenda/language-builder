export function isDeck(value: unknown): value is Deck[] {
	const potentialCard: Deck[] = value as Deck[];

	return (
		Array.isArray(potentialCard) &&
        potentialCard.length !== 0 &&
        Boolean(potentialCard[0].name && potentialCard[0].language)
	);
}
