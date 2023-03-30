import { CloseButton, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFormOptions } from '@/features/languages/create/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { useLanguage } from '@/lib/dataSource/hooks/useLanguage';
import * as utilStyles from '@/styles/shared/Util.styles';

export function Root() {
	const navigate = useNavigate();
	const { store, persist } = useLanguage();
	const form = useForm<CreateLanguageForm>(getFormOptions(store));

	const onSubmit = useCallback(
		(data: CreateLanguageForm) => {
			if (store) {
				store.set(data.shortName, data);
				persist();
				navigate('/languages');
			}
		},
		[store],
	);

	return (
		<ContentElement>
			<form onSubmit={form.onSubmit(onSubmit)} css={utilStyles.grid}>
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
					<SubmitButton group={{ position: 'right' }}>Create</SubmitButton>
				</FieldRow>
			</form>
		</ContentElement>
	);
}
