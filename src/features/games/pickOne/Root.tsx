import { useParams } from 'react-router-dom';
import { useDeck } from '@/lib/dataSource/hooks/useDeck';
import * as utilStyles from '@/styles/shared/Util.styles';
export function Root() {
	const { store } = useDeck();
	const { deckId } = useParams();

	return <div css={[utilStyles.grid]}>Pick one</div>;
}
