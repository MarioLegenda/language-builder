import { css } from '@emotion/react';

export const root = css`
    margin-bottom: 12px;
`;

export const heading = css`
    display: flex;
    justify-content: left;
    align-items: center;
`;
export const isMain = css`
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background-color: var(--color-primary);

    margin-right: 12px;
`;

export const example = css`
    font-style: italic;
    color: var(--color-lightText);
    padding-left: 12px;
`;
