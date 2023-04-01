import { Outlet } from 'react-router';
import * as styles from '@/styles/shared/Util.styles';
export function Content() {
	return (
		<div css={styles.grid}>
			<div css={[styles.column(10), styles.startAt(2), styles.spacing('top', 64)]}>
				<Outlet />
			</div>
		</div>
	);
}
