import { ClubRandom } from '@/features/games/ClubRandom';
import { JustRepeat } from '@/features/games/JustRepeat';
import { JustShowMe } from '@/features/games/JustShowMe';
import { LetMeGuess } from '@/features/games/LetMeGuess';
import { PickOneItem } from '@/features/games/PickOneItem';
import { TimeEscapeItem } from '@/features/games/TimeEscapeItem';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	return (
		<div css={[utilStyles.grid, utilStyles.gap(12)]}>
			<JustShowMe />
			<LetMeGuess />
			<PickOneItem />
			<JustRepeat />
			<TimeEscapeItem />
			<ClubRandom />
		</div>
	);
}
