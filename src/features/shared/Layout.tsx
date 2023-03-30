import React from 'react';
import * as utilStyles from '@/styles/shared/Util.styles';

interface Props {
    navigation: React.ReactNode;
    content: React.ReactNode;
}

export function Layout({ navigation, content }: Props) {
	return (
		<div css={utilStyles.grid}>
			<div css={utilStyles.column(1)}>{navigation}</div>

			<div css={utilStyles.column(11)}>{content}</div>
		</div>
	);
}
