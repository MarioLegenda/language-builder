import { css } from '@emotion/react';
import { FieldRow } from '@/features/shared/components/forms/FieldRow';

const error = css`
    color: var(--color-error);
    border: 1px solid var(--color-error);
    padding: 12px;
    border-radius: 6px;
    margin-top: 24px;
`;

export const GlobalError = ({ children }: React.PropsWithChildren) => (
	<FieldRow>
		<p css={error}>{children}</p>
	</FieldRow>
);
