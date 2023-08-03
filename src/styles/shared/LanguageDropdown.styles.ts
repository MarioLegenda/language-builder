import {css} from '@emotion/react';

export const root = css`
    
`;

export const ifLoading = (isLoading: boolean) => {
	if (isLoading) {
		return css`
          display: flex;
          justify-content: center;
          align-items: center;
`;
	}
};