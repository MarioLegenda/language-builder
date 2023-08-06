import { css } from '@emotion/react';

export const root = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 64px;
    align-items: center;
    font-size: 20px;

    font-weight: bold;
`;

export const actions = css`
    display: flex;
    justify-content: right;
    gap: 12px;
  
    svg {
        cursor: pointer;
    }
`;

export const action = css`
    width: 24px;
  height: 24px;
`;