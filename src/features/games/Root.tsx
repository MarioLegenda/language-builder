import { Item } from '@/features/games/Item';
import { JustShowMe } from '@/features/games/JustShowMe';
import { LetMeGuess } from '@/features/games/LetMeGuess';
import { PickOneItem } from '@/features/games/PickOneItem';
import { TimeEscapeItem } from '@/features/games/TimeEscapeItem';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	return (
		<div css={[utilStyles.grid, utilStyles.gap(12)]}>
			<PickOneItem />
			<TimeEscapeItem />
			<JustShowMe />
			<LetMeGuess />
			<Item title="Party mix" route="party-mix" />
			<Item title="Drill" route="drill" />
		</div>
	);
}
