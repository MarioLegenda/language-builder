import { css } from '@emotion/react';

export const root = css`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    gap: 12px;

    padding: 36px 12px 36px 12px;
`;

export const item = (isActive = false) => css`
    width: 100%;
    display: block;
    text-decoration: none;
    color: ${isActive ? 'white' : 'var(--color-lightText)'};

    border-bottom: 1px solid ${isActive ? 'white' : 'var(--color-lighterBackground)'};
    padding: 4px 8px 4px 0;
    transition: border 0.3s, color 0.3s;

    &:hover {
        border-bottom: 1px solid white;
        color: white;
    }
`;
