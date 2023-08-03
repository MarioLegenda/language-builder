export function isCard(value: unknown): value is Card[] {
	const potentialCard: Card[] = value as Card[];

	return Array.isArray(potentialCard) && potentialCard.length !== 0 && Boolean(potentialCard[0].word && potentialCard[0].deck);
}