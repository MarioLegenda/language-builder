import {getAuth, GoogleAuthProvider, signInWithPopup} from '@firebase/auth';
import { IconBrandGoogle } from '@tabler/icons';
import * as styles from '@/styles/shared/GoogleSignIn.styles';

interface Props {
    onSuccess?: () => void;
    onError?: () => void;
}
export function GoogleSignIn({ onSuccess, onError }: Props) {
	const onClick = () => {
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/firebase');

		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				if (credential) {
					onSuccess?.();
				}
			}).catch(() => {
				onError?.();
			});
	};

	return (
		<div css={styles.root} onClick={onClick}>
			<span css={styles.icon}>
				<IconBrandGoogle color="white" />
			</span>

			<div css={styles.textWidthLoader}>
				<b>Sign in with Google</b>
			</div>
		</div>
	);
}
