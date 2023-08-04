import { css } from '@emotion/react';

export const grid = css`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
`;

export const fullWidth = css`
    width: 100%;
`;

export const gap = (value: number) => css`
    gap: ${value}px;
`;

export const column = (num: number) => css`
    grid-column: span ${num} / span ${num};
`;

export const resizeOn = (px: number, column: number) => css`
    @media (max-width: ${px}px) {
        grid-column: span ${column} / span ${column};
    }
`;

export const startAt = (num: number) => css`
    grid-column-start: ${num};
`;

export const flex = (
	justifyContent: 'space-between' | 'left' | 'right' | 'space-around',
	gap = 'auto',
	align = 'center',
) => css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${align};
    gap: ${gap};
`;

export const background = (cssVariable: string) => css`
    background-color: var(${cssVariable});
`;

export const spacing = (type: 'top' | 'right' | 'bottom' | 'left', value = 0) => css`
        margin-${type}: ${value}px;
    `;

export const padding = (top = 0, right = 0, bottom = 0, left = 0) => css`
    padding: ${top}px ${right}px ${bottom}px ${left}px;
`;
export const pointer = css`
    cursor: pointer;
`;

export const overflow = (value: 'hidden' | 'auto' | 'inherit') =>
	css`
        overflow: ${value};
    `;

export const divider = css`
    border-bottom: 1px solid var(--color-lighterBackground);
`;
