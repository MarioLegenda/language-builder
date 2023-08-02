import { CloseButton, TextInput, Title } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalError } from '@/features/shared/components/GlobalError';
import { Loading } from '@/features/shared/components/Loading';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { LanguageDropdown } from '@/features/shared/components/forms/LanguageDropdown';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useGetDocument } from '@/lib/dataSource/useGetDocument';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import { useSingleQuery } from '@/lib/dataSource/useSingleQuery';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const navigate = useNavigate();
	const params = useParams();
	const [existsError, setExistsError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { mutateAsync, invalidateRelated } = useMutateDocument<Deck>(FirestoreMetadata.deckCollection.name, 'update');
	const { isFetching, data } = useGetDocument<Deck>(
		QueryKeys.DECK_SINGLE_DOCUMENT,
		'decks',
		params.id ? params.id : '',
	);
	const query = useSingleQuery<DeckWithID>();

	const onSubmit = useCallback(async (submitData: CreateDeckForm) => {
		if (!data || !params.id) {
			return;
		}

		setExistsError(false);
		setIsSubmitting(true);

		const exists = await query(
			'decks',
			{
				fieldPath: 'name',
				opStr: '==',
				value: submitData.name,
			},
			{
				fieldPath: 'language',
				opStr: '==',
				value: submitData.language,
			},
		);

		console.log(exists, data);

		if (exists && exists.id !== params.id) {
			setExistsError(true);
			setIsSubmitting(false);
			return;
		}

		try {
			await mutateAsync({
				segment: params.id,
				model: {
					...submitData,
					updatedAt: new Date(),
				},
			});

			setIsSubmitting(false);
		} catch {
			// a trick not to crash the program, useMutateDocument already handles errors
		}

		invalidateRelated([QueryKeys.DECK_LISTING]);
		invalidateRelated([QueryKeys.DECK_SINGLE_DOCUMENT]);

		navigate('/decks');
	}, [params.id, data]);

	return (
		<>
			<Loading visible={isFetching} customStyles={utilStyles.spacing('top', 60)} />

			{!isFetching && data && (
				<Form
					onSubmit={onSubmit}
					fields={(form) => (
						<>
							<FieldRow>
								<div css={utilStyles.flex('space-between')}>
									<Title order={3}>Edit a deck</Title>
									{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
									{/*
						// @ts-ignore */}
									<CloseButton component={Link} to="/decks" />
								</div>

								{existsError && <GlobalError>Deck with these values already exists</GlobalError>}
							</FieldRow>

							<FieldRow>
								<TextInput autoFocus placeholder="Name" {...form.getInputProps('name')} />
							</FieldRow>

							<FieldRow>
								<LanguageDropdown label="Language" name="language" form={form} />
							</FieldRow>

							<FieldRow>
								<SubmitButton
									button={{
										disabled: isSubmitting,
									}}
									group={{ position: 'right' }}>
                                    Edit
								</SubmitButton>
							</FieldRow>
						</>
					)}
					validate={{
						name: (value: string) => {
							const invalid = requiredAndLimited('name', value, 1, 200);
							if (invalid) return invalid;
						},
						language: (value: string) => {
							const invalid = requiredAndLimited('language', value, 1, 200);

							if (invalid) {
								return invalid;
							}
						},
					}}
					initialValues={{
						name: data.name,
						language: data.language,
					}}
				/>
			)}
		</>
	);
}
