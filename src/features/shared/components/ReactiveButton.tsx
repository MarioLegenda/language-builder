import { useCallback, useState } from 'react';
import * as styles from '@/styles/shared/ReactiveButton.styles';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onAction: () => void;
    timeout: number;
}
export const ReactiveButton = ({ onAction, children, timeout, ...rest }: Props) => {
	const [startAnimation, setStartAnimation] = useState(false);
	const [isActionReceived, setIsActionReceived] = useState(false);

	const onMouseLeave = useCallback(() => {
		if (!isActionReceived) setStartAnimation(false);
	}, [isActionReceived]);

	const onMouseDown = useCallback(() => {
		if (!isActionReceived) setStartAnimation(true);
	}, [isActionReceived]);

	const onMouseUp = useCallback(() => {
		if (!isActionReceived) setStartAnimation(false);
	}, [isActionReceived]);

	return (
		<div onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} onMouseUp={onMouseUp} css={styles.root}>
			<button {...rest}>{children}</button>

			{startAnimation && (
				<div
					onAnimationEnd={() => {
						setIsActionReceived(true);
						onAction();
					}}
					css={[styles.outline, styles.durationAnimation(timeout)]}
				/>
			)}
		</div>
	);
};
