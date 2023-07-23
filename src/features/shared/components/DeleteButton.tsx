import { Button, Group, Popover, Title } from '@mantine/core';
import { useState } from 'react';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    onRemove: () => void;
}

export function DeleteButton({ onRemove }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Popover opened={open} width={300} trapFocus position="bottom" withArrow shadow="md" onChange={setOpen}>
			<Popover.Target>
				<Button onClick={() => setOpen(true)} compact color="red" variant="outline">
                    Delete
				</Button>
			</Popover.Target>
			<Popover.Dropdown
				sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
				<Title order={5} css={utilStyles.spacing('bottom', 32)}>
                    Are you sure?
				</Title>

				<Group position="apart">
					<Button onClick={() => setOpen(false)} color="gray" variant="outline">
                        Cancel
					</Button>
					<Button
						disabled={true}
						onClick={() => {
							onRemove();
							setOpen(false);
						}}
						variant="default">
                        Remove
					</Button>
				</Group>
			</Popover.Dropdown>
		</Popover>
	);
}
