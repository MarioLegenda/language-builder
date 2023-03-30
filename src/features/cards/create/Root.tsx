import { Button, CloseButton, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormFields } from '@/features/cards/create/components/FormFields';
import { getFormOptions } from '@/features/cards/create/helpers/getFormOptions';
import { ContentElement } from '@/features/shared/components/ContentElement';
import { DeckDropdown } from '@/features/shared/components/forms/DeckDropdown';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';
import { LanguageDropdown } from '@/features/shared/components/forms/LanguageDropdown';
import { SubmitButton } from '@/features/shared/components/forms/SubmitButton';
import { CardStore } from '@/lib/dataSource/cards';
import * as utilStyles from '@/styles/shared/Util.styles';
interface Props {
    isUpdate?: boolean;
}
export function Root({ isUpdate = false }: Props) {
	const params = useParams();
	const navigate = useNavigate();
	const existing = CardStore.get(params.id as string);
	const form = useForm<CreateCardForm>(getFormOptions({ ...existing }));

	const onSubmit = useCallback((data: CreateCardForm) => {
		if (isUpdate && params.id) {
			CardStore.update(params.id, data.name, data as Card);
		} else {
			CardStore.set(data.name, data as Card);
		}

		CardStore.persist();
		navigate('/cards');
	}, []);

	return (
		<ContentElement>
			<form onSubmit={form.onSubmit(onSubmit)} css={utilStyles.grid}>
				<FieldRow>
					<div css={utilStyles.flex('space-between')}>
						<Title order={3}>Create a new card</Title>
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
						{/*
						// @ts-ignore */}
						<CloseButton component={Link} to="/cards" />
					</div>
				</FieldRow>

				<FieldRow>
					<TextInput autoFocus placeholder="Name" {...form.getInputProps('name')} />
				</FieldRow>

				<FieldRow>
					<DeckDropdown form={form} name="deck" />
				</FieldRow>

				<div css={[utilStyles.column(12), utilStyles.grid, utilStyles.gap(12)]}>
					<div css={utilStyles.column(6)}>
						<LanguageDropdown<CreateCardForm> form={form} name="fromLanguage" label="From language" />
					</div>

					<div css={utilStyles.column(6)}>
						<LanguageDropdown<CreateCardForm> form={form} name="toLanguage" label="To language" />
					</div>
				</div>

				<div css={[utilStyles.column(12), utilStyles.spacing('bottom', 32)]}>
					<FormFields form={form} />

					<Group position="right">
						<Button
							onClick={() =>
								form.insertListItem('translations', {
									name: '',
									type: '',
									gender: '',
									language: '',
									example: '',
									hint: '',
									isMain: false,
								})
							}
							variant="default">
                            Add
						</Button>
					</Group>
				</div>

				<FieldRow>
					<SubmitButton group={{ position: 'right' }}>{isUpdate ? 'Update' : 'Create'}</SubmitButton>
				</FieldRow>
			</form>
		</ContentElement>
	);
}
