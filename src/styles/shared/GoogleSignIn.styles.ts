import { css } from '@emotion/react';

export const root = css`
    width: 240px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;
    padding: 4px;

    border: 1px solid white;
    transition: border 0.3s;
    cursor: pointer;

    border-radius: 6px;

    &:hover {
        border: 1px solid var(--color-primary);

        span:first-child {
            background-color: var(--color-primary);
        }
    }
`;

export const textWidthLoader = css`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;
    font-size: 14px;
`;

export const disabled = css`
    border: 1px solid var(--color-disabled);
    color: var(--color-disabled);
    cursor: not-allowed;
    transition: none;

    span:first-child {
        transition: none;
        background-color: var(--color-disabled);
    }

    &:hover {
        border: 1px solid var(--color-disabled);

        span:first-child {
            background-color: var(--color-disabled);
        }
    }
`;
export const icon = css`
    padding: 12px;
    background-color: var(--color-primaryBackground);
    transition: background-color 0.3s;
`;
