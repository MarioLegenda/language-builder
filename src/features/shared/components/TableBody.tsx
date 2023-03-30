import * as styles from '@/styles/languages/Root.styles';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
interface Props {
    rows: EmotionJSX.Element[];
}
export function TableBody({ rows }: Props) {
	return (
		<tbody>
			{rows.length ? (
				rows
			) : (
				<tr>
					<td>
						<p css={styles.nothingFound}>Nothing found</p>
					</td>
				</tr>
			)}
		</tbody>
	);
}
