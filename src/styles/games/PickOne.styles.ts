import { css } from '@emotion/react';

export const root = css``;

export const item = css`
    border: 1px solid var(--color-lightText);
    border-radius: 4px;
    padding: 8px;

    margin-right: 8px;

    cursor: pointer;
    transition: color 0.3s, border 0.3s;

    &:hover {
        border: 1px solid white;
        color: white;
    }
`;

export const correctItem = css`
    border: 1px solid green;
    color: green;
`;

export const status = (status: boolean) => css`
    font-weight: bolder;
    color: ${status ? 'green' : 'red'};
    text-align: center;
`;

export const timer = (time: number) => css`
    color: ${time <= 2 ? 'red' : 'green'};
`;
