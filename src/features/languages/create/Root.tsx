import { CloseButton, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFormOptions } from '@/features/languages/edit/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { FirestoreMetadata } from '@/lib/dataSource/firestoreMetadata';
import { QueryKeys } from '@/lib/dataSource/queryKeys';
import { useMutateDocument } from '@/lib/dataSource/useMutateDocument';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const navigate = useNavigate();
	const form = useForm<CreateLanguageForm>(getFormOptions());

	const { mutateAsync, isLoading, invalidateRelated } = useMutateDocument<Language>(
		FirestoreMetadata.languageCollection.name,
	);

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
			<form onSubmit={form.onSubmit(onSubmit)} css={[utilStyles.grid, utilStyles.gap(4)]}>
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
			</form>
		</ContentElement>
	);
}
