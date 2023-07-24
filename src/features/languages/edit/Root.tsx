import { CloseButton, TextInput, Title } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalError } from '@/features/shared/components/GlobalError';
import { Loading } from '@/features/shared/components/Loading';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { useGetDocument as useGetFirebaseDocument } from '@/lib/dataSource/firebase';
import { FirestoreMetadata } from '@/lib/dataSource/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useGetDocument } from '@/lib/dataSource/useGetDocument';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const params = useParams();
	const navigate = useNavigate();
	const [existsError, setExistsError] = useState(false);

	const { mutateAsync, invalidateRelated, isLoading } = useMutateDocument<Language>(
		FirestoreMetadata.languageCollection.name,
		'set',
	);

	const { isFetching, data } = useGetDocument<Language>('languages', params.id ? params.id : '');
	const getDocument = useGetFirebaseDocument<Language>();

	const onSubmit = useCallback(
		async (submitData: CreateLanguageForm) => {
			setExistsError(false);

			const exists = await getDocument('languages', submitData.shortName);
			if (exists && data?.name !== submitData.name) {
				setExistsError(true);
				return;
			}

			try {
				await mutateAsync({
					segment: submitData.shortName,
					model: {
						...submitData,
						createdAt: new Date(),
						updatedAt: null,
					},
				});
			} catch {
				// a trick not to crash the program, useMutateDocument already handles errors
			}

			invalidateRelated([QueryKeys.LANGUAGE_LISTING]);

			navigate('/languages');
		},
		[data],
	);

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
								<TextInput
									disabled={true}
									placeholder="Short name"
									{...form.getInputProps('shortName')}
								/>
							</FieldRow>

							<FieldRow>
								<SubmitButton
									group={{ position: 'right' }}
									button={{
										disabled: isLoading,
									}}>
                                    Update
								</SubmitButton>
							</FieldRow>
						</>
					)}
					initialValues={{
						name: data.name,
						shortName: data.shortName,
					}}
					validate={{
						name: (value: string) => requiredAndLimited('name', value, 1, 200),
						shortName: (value: string) => {
							const invalid = requiredAndLimited('name', value, 1, 200);

							if (invalid) {
								return invalid;
							}
						},
					}}
				/>
			)}
		</>
	);
}
