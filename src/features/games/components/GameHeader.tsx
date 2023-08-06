import { Modal, MultiSelect } from '@mantine/core';
import { IconArticle, IconAtom } from '@tabler/icons';

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/features/shared/components/Loading';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { CardStore } from '@/lib/dataSource/cards';
import { DeckStore } from '@/lib/dataSource/deck';
import { useGetAll } from '@/lib/dataSource/firebase/useGetAll';
import { Storage } from '@/lib/dataSource/storage';
import { isDeck } from '@/lib/dataSource/typeCheck/isDeck';
import * as styles from '@/styles/games/GameHeader.styles';
import type { SelectItem } from '@mantine/core';
import type { ReactNode } from 'react';

interface Props {
    title: string;
    game: string;
}

interface SelectForm {
    data: Value[];
}

type Value = Record<'word' | 'name' | 'id', string>;

function createSelectValue(values: Deck[] | Card[]): SelectItem[] {
	if (isDeck(values)) {
		return values.map((item) => ({
			label: item.name,
			value: item.id as string,
		}));
	}

	return values.map((item) => ({
		label: item.word,
		value: item.id as string,
	}));
}

function ActionButton({ isLoading, icon }: { isLoading: boolean; icon: ReactNode }) {
	return (
		<div css={styles.action}>
			{isLoading && <Loading visible={isLoading} />}
			{!isLoading && icon}
		</div>
	);
}
export function GameHeader({ title, game }: Props) {
	const navigate = useNavigate();

	const redirect = useCallback(
		(id: 'anonymous' | 'anonymous-decks') => {
			if (game === 'time-escape') {
				navigate(`/admin/games/${game}/${id}/4/single-deck`);

				return;
			}

			if (game === 'pick-one') {
				navigate(`/admin/games/${game}/${id}/shuffle/single-deck`);

				return;
			}

			if (game === 'just-repeat') {
				navigate(`/admin/games/${game}/${id}/shuffle/single-deck`);

				return;
			}

			navigate(`/admin/games/${game}/${id}`);
		},
		[game],
	);

	const [isAnonymousOpen, setIsAnonymousOpen] = useState(false);
	const [isDeckChooserOpen, setIsDeckChooserOpen] = useState(false);

	const [isFetchingDecks, setIsFetchingDecks] = useState(false);
	const [isFetchingCards, setIsFetchingCards] = useState(false);

	const [decks, setDecks] = useState<Deck[] | undefined>();
	const [cards, setCards] = useState<Card[] | undefined>();

	const getAllDecks = useGetAll();
	const getAllCards = useGetAll();

	const onCreateAnonymous = (data: SelectForm) => {
		DeckStore.remove('anonymous');
		CardStore.removeBy((item) => item.deck === 'anonymous');

		DeckStore.set('anonymous', {
			name: 'anonymous',
			id: 'anonymous',
			language: 'anonymous',
		});

		let count = 0;
		for (const value of data.data) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const card = CardStore.get(value as string);
			const id = `anonymous-${count}`;

			CardStore.set(id, {
				...card,
				id: id,
				deck: 'anonymous',
			});

			count++;
		}

		DeckStore.persist();
		CardStore.persist();

		redirect('anonymous');
	};

	const onCreateDeckChooser = (data: SelectForm) => {
		const storage = new Storage('anonymous-decks');
		storage.remove('ids');
		storage.set('ids', data.data);
		storage.persist();

		redirect('anonymous-decks');
	};

	const onFetchDecks = async () => {
		setIsFetchingDecks(true);
		const decks = await getAllDecks('decks');
		setDecks(decks as Deck[]);

		setIsDeckChooserOpen(true);
		setIsFetchingDecks(false);
	};

	const onFetchCards = async () => {
		setIsFetchingCards(true);
		const cards = await getAllCards('cards');
		setCards(cards as Card[]);

		setIsAnonymousOpen(true);
		setIsFetchingCards(false);
	};

	return (
		<>
			<h2 css={styles.root}>
				<span>{title}</span>

				<div css={styles.actions}>
					<ActionButton icon={<IconAtom onClick={() => onFetchCards()} />} isLoading={isFetchingCards} />
					<ActionButton icon={<IconArticle onClick={() => onFetchDecks()} />} isLoading={isFetchingDecks} />
				</div>
			</h2>

			<Modal
				opened={isAnonymousOpen && Boolean(cards)}
				title="Create anonymous deck"
				onClose={() => setIsAnonymousOpen(false)}>
				<>
					<Form<SelectForm>
						onSubmit={onCreateAnonymous}
						fields={(form) => (
							<>
								<FieldRow>
									<MultiSelect
										name="data"
										data={createSelectValue(cards as Card[])}
										placeholder="Choose your decks"
										{...form.getInputProps('data')}
									/>
								</FieldRow>

								<FieldRow>
									<SubmitButton
										button={{
											disabled: false,
										}}
										group={{ position: 'right' }}>
                                        Play
									</SubmitButton>
								</FieldRow>
							</>
						)}
						initialValues={{
							data: [],
						}}
						validate={{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							/*
						// @ts-ignore */
							data: (values: string[]) => {
								if (values.length === 0) {
									return 'Nothing selected';
								}

								const firstCard = CardStore.get(values[0]) as Card;

								for (const value of values) {
									const card = CardStore.get(value);

									if (!card) {
										return `Card with ID ${value} not found.`;
									}

									if (
										card.fromLanguage !== firstCard.fromLanguage &&
                                        card.toLanguage !== firstCard.toLanguage
									) {
										return 'All cards must be of the same \'from\' and \'to\' language';
									}
								}

								return false;
							},
						}}
					/>
				</>
			</Modal>

			<Modal
				opened={isDeckChooserOpen && Boolean(decks)}
				title="Pick your decks"
				onClose={() => setIsDeckChooserOpen(false)}>
				<>
					<Form<SelectForm>
						onSubmit={onCreateDeckChooser}
						fields={(form) => (
							<>
								<FieldRow>
									<MultiSelect
										name="data"
										data={createSelectValue(decks as Deck[])}
										placeholder="Choose your decks"
										{...form.getInputProps('data')}
									/>
								</FieldRow>

								<FieldRow>
									<SubmitButton
										button={{
											disabled: false,
										}}
										group={{ position: 'right' }}>
                                        Play
									</SubmitButton>
								</FieldRow>
							</>
						)}
						initialValues={{
							data: [],
						}}
					/>
				</>
			</Modal>
		</>
	);
}
