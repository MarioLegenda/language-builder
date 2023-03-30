import { CloseButton, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFormOptions } from '@/features/languages/create/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { LanguageStore } from '@/lib/dataSource/language';
import * as utilStyles from '@/styles/shared/Util.styles';
interface Props {
    isUpdate?: boolean;
}
export function Root({ isUpdate = false }: Props) {
	const params = useParams();
	const navigate = useNavigate();
	const form = useForm<CreateLanguageForm>(getFormOptions({ ...LanguageStore.get(params.id as string) }));

	const onSubmit = useCallback((data: CreateLanguageForm) => {
		if (isUpdate && params.id) {
			LanguageStore.update(params.id, data.shortName, data);
		} else {
			LanguageStore.set(data.shortName, data);
		}

		LanguageStore.persist();
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
					<SubmitButton group={{ position: 'right' }}>{isUpdate ? 'Update' : 'Create'}</SubmitButton>
				</FieldRow>
			</form>
		</ContentElement>
	);
}
