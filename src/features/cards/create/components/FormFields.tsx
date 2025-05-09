import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { IconCircleMinus } from '@tabler/icons';
import React from 'react';
import { LanguageDropdown } from '@/features/shared/components/forms/LanguageDropdown';
import * as styles from '@/styles/shared/Util.styles';
import type { UseFormReturnType } from '@mantine/form';

interface Props {
    form: UseFormReturnType<CreateCardForm>;
}

export function FormFields({ form }: Props) {
	return (
		<>
			{form.values.translations.map((item: CreateTranslationForm, index: number) => (
				<Group
					key={index}
					mt="xs"
					css={[
						styles.grid,
						styles.spacing('bottom', 12),
						styles.background('--color-lighterBackground'),
						styles.padding(24, 24, 24, 32),
					]}>
					<div css={styles.column(12)}>
						<TextInput
							placeholder="Word"
							withAsterisk
							sx={{ flex: 1 }}
							{...form.getInputProps(`translations.${index}.name`)}
						/>
					</div>

					<div css={styles.column(12)}>
						<LanguageDropdown form={form} name={`translations.${index}.language`} />
					</div>

					<div css={styles.column(12)}>
						<Checkbox
							checked={form.values.translations[index].isMain}
							label="Is main translation?"
							sx={{ flex: 1 }}
							{...form.getInputProps(`translations.${index}.isMain`)}
						/>
					</div>

					{index !== 0 && (
						<div css={styles.column(12)}>
							<Group position="right">
								<Button
									onClick={() => form.removeListItem('translations', index)}
									color="red"
									variant="subtle"
									compact
									size="xs"
									leftIcon={<IconCircleMinus size={14} />}>
                                    Remove
								</Button>
							</Group>
						</div>
					)}
				</Group>
			))}
		</>
	);
}
