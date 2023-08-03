import { CloseButton, TextInput, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalError } from '@/features/shared/components/GlobalError';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { LanguageDropdown } from '@/features/shared/components/forms/LanguageDropdown';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { FirestoreMetadata } from '@/lib/dataSource/firebase/firestoreMetadata';
import { useGetDocument } from '@/lib/dataSource/firebase/useGetDocument';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const navigate = useNavigate();
	const [existsError, setExistsError] = useState(false);
	const { mutateAsync, isLoading, invalidateRelated } = useMutateDocument<Deck>(
		FirestoreMetadata.deckCollection.name,
		'add',
	);
	const getDocument = useGetDocument();

	const onSubmit = useCallback(async (data: CreateDeckForm) => {
		setExistsError(false);

		const exists = await getDocument('decks', data.language);
		if (exists) {
			setExistsError(true);
			return;
		}

		try {
			await mutateAsync({
				model: {
					...data,
					createdAt: new Date(),
					updatedAt: null,
				},
			});
		} catch {
			// a trick not to crash the program, useMutateDocument already handles errors
		}

		invalidateRelated([QueryKeys.DECK_LISTING]);

		navigate('/admin/decks');
	}, []);

	return (
		<Form
			onSubmit={onSubmit}
			fields={(form) => (
				<>
					<FieldRow>
						<div css={utilStyles.flex('space-between')}>
							<Title order={3}>Create new deck</Title>
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/*
						// @ts-ignore */}
							<CloseButton component={Link} to="/admin/decks" />
						</div>

						{existsError && <GlobalError>Language with this short name already exists</GlobalError>}
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
								disabled: isLoading,
							}}
							group={{ position: 'right' }}>
                            Create
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
				name: '',
				language: '',
			}}
		/>
	);
}
