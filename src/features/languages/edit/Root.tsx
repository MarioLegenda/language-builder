import { CloseButton, LoadingOverlay, TextInput, Title } from '@mantine/core';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { Form } from '@/features/shared/components/forms/Form';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { FirestoreMetadata } from '@/lib/dataSource/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useGetDocument } from '@/lib/dataSource/useGetDocument';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import { requiredAndLimited } from '@/lib/validation/requiredAndLimited';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const params = useParams();
	const navigate = useNavigate();

	const { mutateAsync, invalidateRelated, isLoading } = useMutateDocument<Language>(
		FirestoreMetadata.languageCollection.name,
		true,
	);
	const { isFetching, data } = useGetDocument<Language>('languages', params.id ? params.id : '');

	const onSubmit = useCallback(async (data: CreateLanguageForm) => {
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
		<ContentElement>
			<LoadingOverlay
				visible={isFetching}
				loaderProps={{
					size: 'xs',
				}}
			/>

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
		</ContentElement>
	);
}
