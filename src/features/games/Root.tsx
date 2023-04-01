import { Item } from '@/features/games/Item';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	return (
		<div css={[utilStyles.grid, utilStyles.gap(12)]}>
			<Item title="Pick one" route="pick-one" />
			<Item title="Time escape" route="time-escape" />
		</div>
	);
}
