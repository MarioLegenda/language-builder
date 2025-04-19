import { Button, Table } from '@mantine/core';
import React from 'react';
import { Header } from '@/features/shared/components/Header';
import { Loading } from '@/features/shared/components/Loading';
import { TableBody } from '@/features/shared/components/TableBody';
import * as styles from '@/styles/languages/Root.styles';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
interface Props {
    showTable: boolean;
    showNothing: boolean;
    rows: () => EmotionJSX.Element[];
    header: {
        createTo: string;
        title: string;
        showLoading?: boolean;
    };
    globalLoader: {
        isLoading: boolean;
    };
    tableRows: string[];
    onNext: VoidFn;
    onPrev: VoidFn;
}
export const Listing = ({
	rows,
	showTable,
	showNothing,
	tableRows,
	header: { createTo, title, showLoading },
	globalLoader: { isLoading },
	onNext,
	onPrev,
}: Props) => (
	<div css={styles.root}>
		<Header createTo={createTo} title={title} showLoading={showLoading} />

		<Loading visible={isLoading} />

		{showTable && (
			<Table>
				<thead>
					<tr>
						{tableRows.map((item) => (
							<th key={item}>{item}</th>
						))}
					</tr>
				</thead>

				<TableBody rows={rows()} />
			</Table>
		)}

		{showNothing && <p css={styles.nothingFound}>Nothing found</p>}

		{!showNothing && (
			<div css={styles.paginationRoot}>
				<Button onClick={onNext} color="gray" variant="outline" disabled={isLoading}>
                    Previous
				</Button>
				<Button onClick={onPrev} color="gray" variant="outline" disabled={isLoading}>
                    Next
				</Button>
			</div>
		)}
	</div>
);
