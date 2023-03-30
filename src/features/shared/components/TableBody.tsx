import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
interface Props {
    rows: EmotionJSX.Element[];
}
export function TableBody({ rows }: Props) {
	return <tbody>{rows}</tbody>;
}
