import { CloseButton, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFormOptions } from '@/features/decks/create/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { DeckStore } from '@/lib/dataSource/deck';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    isUpdate?: boolean;
}

export function Root({ isUpdate = false }: Props) {
	const params = useParams();
	const navigate = useNavigate();
	const form = useForm<CreateDeckForm>(
		getFormOptions({
			name: params.id,
		}),
	);

	const onSubmit = useCallback((data: CreateDeckForm) => {
		if (isUpdate && params.id) {
			DeckStore.update(params.id, data.name, data);
		} else {
			DeckStore.set(data.name, data);
		}

		DeckStore.persist();
		navigate('/decks');
	}, []);

	return (
		<ContentElement>
			<form onSubmit={form.onSubmit(onSubmit)} css={utilStyles.grid}>
				<FieldRow>
					<div css={utilStyles.flex('space-between')}>
						<Title order={3}>Create new decks</Title>
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
						{/*
						// @ts-ignore */}
						<CloseButton component={Link} to="/decks" />
					</div>
				</FieldRow>

				<FieldRow>
					<TextInput autoFocus placeholder="Name" {...form.getInputProps('name')} />
				</FieldRow>

				<FieldRow>
					<SubmitButton group={{ position: 'right' }}>{isUpdate ? 'Update' : 'Create'}</SubmitButton>
				</FieldRow>
			</form>
		</ContentElement>
	);
}
