import { css } from '@emotion/react';

export const root = css`
    min-width: 480px;
  margin: 0 auto;
  overflow: scroll;
`;

export const nothingFound = css`
    color: var(--color-lightText);
    text-align: center;

    margin-top: 48px;
`;
export const pagination = css`
    margin-top: 64px;
`;
export const filters = css`
    margin: 24px 0 24px 0;
`;
export const filtersLabel = css`
    display: block;
    margin-right: 24px;
`;
export const filtersList = css`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;

    margin-bottom: 64px;
`;

export const paginationRoot = css`
    display: flex;
    justify-content: center;
    gap: 32px;
    margin: 64px 0 64px 0;
`;
