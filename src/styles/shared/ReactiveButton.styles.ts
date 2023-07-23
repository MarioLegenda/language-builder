import { css } from '@emotion/react';

export const root = css`
    position: relative;
    width: 100px;
    height: 30px;

    button {
        width: 100px;
        height: 30px;

        background-color: transparent;
        color: #eb4034;
        border: 1px solid #eb4034;
        border-radius: 5px;
    }
`;

export const outline = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 1;

    background-color: #eb4034;
    border-radius: 5px;
    opacity: 0.7;
`;

export const durationAnimation = (duration: number) => css`
    animation-name: slide;
    animation-duration: ${duration}s;
    animation-timing-function: linear;

    @keyframes slide {
        from {
            width: 0;
        }

        to {
            width: 100%;
        }
    }
`;
