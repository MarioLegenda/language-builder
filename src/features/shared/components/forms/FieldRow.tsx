import * as utilStyles from '@/styles/shared/Util.styles';
import type { PropsWithChildren } from 'react';

interface Props {
    column?: number;
    startColumnAt?: number;
    bottomSpacing?: number;
    topSpacing?: number;
}

export function FieldRow({
	children,
	column = 12,
	startColumnAt = 0,
	bottomSpacing = 32,
	topSpacing = 0,
}: Props & PropsWithChildren) {
	return (
		<div
			css={[
				utilStyles.column(column),
				utilStyles.startAt(startColumnAt),
				utilStyles.spacing('bottom', bottomSpacing),
				utilStyles.spacing('top', topSpacing),
			]}>
			{children}
		</div>
	);
}
