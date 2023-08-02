import { CloseButton, TextInput, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalError } from '@/features/shared/components/GlobalError';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
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

	const { mutateAsync, isLoading, invalidateRelated } = useMutateDocument<Language>(
		FirestoreMetadata.languageCollection.name,
	);
	const getDocument = useGetDocument();

	const onSubmit = useCallback(async (data: CreateLanguageForm) => {
		setExistsError(false);

		const exists = await getDocument('languages', data.shortName);
		if (exists) {
			setExistsError(true);
			return;
		}

		try {
			await mutateAsync({
				segment: data.shortName,
				model: {
					...data,
					createdAt: new Date(),
					updatedAt: null,
				},
			});
		} catch {
			// a trick not to crash the program, useMutateDocument already handles errors
		}

		invalidateRelated([QueryKeys.LANGUAGE_LISTING]);

		navigate('/languages');
	}, []);

	return (
		<>
			<Form
				validate={{
					name: (value: string) => requiredAndLimited('name', value, 1, 200),
					shortName: (value: string) => {
						const invalid = requiredAndLimited('name', value, 1, 200);

						if (invalid) {
							return invalid;
						}
					},
				}}
				initialValues={{
					name: '',
					shortName: '',
				}}
				customStyles={[utilStyles.grid, utilStyles.gap(4)]}
				onSubmit={onSubmit}
				fields={(form) => (
					<>
						<FieldRow>
							<div css={utilStyles.flex('space-between')}>
								<Title order={3}>Create new language</Title>
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
								{/*
						// @ts-ignore */}
								<CloseButton component={Link} to="/languages" />
							</div>

							{existsError && <GlobalError>Language with this short name already exists</GlobalError>}
						</FieldRow>

						<FieldRow>
							<TextInput autoFocus placeholder="Name" {...form.getInputProps('name')} />
						</FieldRow>

						<FieldRow>
							<TextInput placeholder="Short name" {...form.getInputProps('shortName')} />
						</FieldRow>

						<FieldRow>
							<SubmitButton
								group={{ position: 'right' }}
								button={{
									disabled: isLoading,
								}}>
                                Create
							</SubmitButton>
						</FieldRow>
					</>
				)}
			/>
		</>
	);
}
