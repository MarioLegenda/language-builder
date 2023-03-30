import { CloseButton, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFormOptions } from '@/features/languages/create/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { useLanguage } from '@/lib/dataSource/hooks/useLanguage';
import * as utilStyles from '@/styles/shared/Util.styles';
interface Props {
    isUpdate?: boolean;
}
export function Root({ isUpdate = false }: Props) {
	const params = useParams();
	const navigate = useNavigate();
	const { store, persist } = useLanguage();
	const form = useForm<CreateLanguageForm>(getFormOptions(store, { ...store.get(params.id as string) }));

	const onSubmit = useCallback(
		(data: CreateLanguageForm) => {
			if (store) {
				if (isUpdate && params.id) {
					store.update(params.id, data.shortName, data);
				} else {
					store.set(data.name, data);
				}

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
					<SubmitButton group={{ position: 'right' }}>{isUpdate ? 'Update' : 'Create'}</SubmitButton>
				</FieldRow>
			</form>
		</ContentElement>
	);
}
