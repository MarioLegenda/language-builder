import { Button, CloseButton, Group, TextInput, Title } from '@mantine/core';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormFields } from '@/features/cards/create/components/FormFields';
import { getDefaultTranslationValues } from '@/features/cards/create/helpers/getDefaultTranslationValues';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { LanguageDropdown } from '@/features/shared/components/forms/LanguageDropdown';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { getDocRef } from '@/lib/dataSource/firebase/getDocRef';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
function buildModel(model: CreateCardForm) {
	let buildModel: Card = {
		...model,
		translations: {},
	};

	const translations: Translations = {};
	for (const translation of model.translations) {
		const ref = getDocRef(FirestoreMetadata.deckCollection.name);
		const id = ref.id;

		translations[id] = translation;

		buildModel = {
			...model,
			translations: translations,
			createdAt: new Date(),
		};
	}

	return buildModel;
}
export function Root() {
	const navigate = useNavigate();

	const { mutateAsync, isLoading, invalidateRelated } = useMutateDocument<Card>(
		FirestoreMetadata.cardsCollection.name,
		'add',
	);

	const onSubmit = useCallback(async (data: CreateCardForm) => {
		await mutateAsync({
			model: buildModel(data),
		});

		invalidateRelated([QueryKeys.CARDS_LISTING]);
		navigate('/admin/cards');
	}, []);

	return (
		<Form
			customStyles={utilStyles.grid}
			onSubmit={onSubmit}
			fields={(form) => (
				<>
					<FieldRow>
						<div css={utilStyles.flex('space-between')}>
							<Title order={3}>Create a new card</Title>
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/*
						// @ts-ignore */}
							<CloseButton component={Link} to="/admin/cards" />
						</div>
					</FieldRow>

					<FieldRow>
						<TextInput autoFocus placeholder="Name" {...form.getInputProps('word')} />
					</FieldRow>

					<FieldRow>
						<DeckDropdown topLevelForm={form} name="deck" />
					</FieldRow>

					<div css={[utilStyles.column(12), utilStyles.grid, utilStyles.gap(12)]}>
						<div css={utilStyles.column(6)}>
							<LanguageDropdown<CreateCardForm> form={form} name="fromLanguage" label="From language" />
						</div>

						<div css={utilStyles.column(6)}>
							<LanguageDropdown<CreateCardForm> form={form} name="toLanguage" label="To language" />
						</div>
					</div>

					<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
						<FormFields form={form} />

						<Group position="right">
							<Button
								onClick={() => form.insertListItem('translations', getDefaultTranslationValues())}
								variant="default">
                                Add
							</Button>
						</Group>
					</div>

					<FieldRow>
						<SubmitButton
							button={{
								disabled: isLoading,
							}}
							group={{ position: 'right' }}>
                            Create
						</SubmitButton>
					</FieldRow>
				</>
			)}
			initialValues={{
				word: '',
				deck: '',
				fromLanguage: '',
				toLanguage: '',
				translations: getDefaultTranslationValues(),
			}}
			validate={{
				word: (value: string) => requiredAndLimited('word', value, 1, 200),
				deck: (value: string) => {
					const invalid = requiredAndLimited('deck', value, 2, 2);
					if (invalid) return invalid;
				},
				fromLanguage: (value: string) => {
					const invalid = requiredAndLimited('fromLanguage', value, 2, 2);
					if (invalid) return invalid;
				},
				toLanguage: (value: string) => {
					const invalid = requiredAndLimited('toLanguage', value, 2, 2);
					if (invalid) return invalid;
				},
				translations: {
					name: (value: string) => requiredAndLimited('translation', value, 1, 200),
					language: (value: string) => requiredAndLimited('language', value, 2, 2),
					isMain: (value: boolean, values: CreateCardForm) => {
						const hasMain = values.translations.filter((item) => item.isMain).length;
						if (!hasMain) return 'At least one translation has to be the main translation.';
						if (hasMain > 1) return 'There can only be one main translation.';
					},
				},
			}}
		/>
	);
}
