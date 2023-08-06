import { css } from '@emotion/react';

export const root = css``;

export const item = css`
    border: 1px solid var(--color-darkLight);
    border-radius: 4px;
    display: inline-block;
    font-size: 24px;
    min-width: 100px;
    text-align: center;
    color: white;

    margin: 0 12px 12px 0;

    cursor: pointer;
    transition: color 0.3s, border 0.3s;

    &:hover {
        border: 1px solid var(--color-lightText);
        color: white;
    }
`;

export const correctItem = css`
    border: 1px solid #45964d;
    color: #45964d;
`;

export const incorrectItem = css`
    border: 1px solid var(--color-error) !important;
    color: var(--color-error) !important;
`;

export const status = (status: boolean) => css`
    font-weight: bolder;
    color: ${status ? 'green' : 'red'};
    text-align: center;
`;

export const timer = (time: number) => css`
    color: ${time <= 2 ? 'red' : 'green'};
`;
