import { Notification } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleSignIn } from '@/features/shared/components/GoogleSignIn';
import { initializeFirebase } from '@/lib/dataSource/firebase/firebase';
import { useIsBrowser } from '@/lib/helpers/useIsBrowser';
import * as styles from '@/styles/shared/login/Login.styles';

export default function Index() {
	const [isError, setIsError] = useState(false);
	const isBrowser = useIsBrowser();
	const { push } = useRouter();

	useEffect(() => {
		if (isBrowser) {
			initializeFirebase();
		}
	}, [isBrowser]);

	return (
		<>
			<main>
				<div css={styles.root}>
					<GoogleSignIn onError={() => setIsError(true)} onSuccess={() => push('/admin')} />

					{isError && (
						<Notification css={styles.error} color="red" disallowClose>
                            An error occurred. Please, try again later.
						</Notification>
					)}
				</div>
			</main>
		</>
	);
}
