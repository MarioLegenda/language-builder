import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from '@firebase/auth';

interface Props {
    onSuccess: (user: User) => void;
    onError: VoidFn;
}
export function authChangeListener({ onSuccess, onError }: Props) {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user && user.email === 'marioskrlec222@gmail.com') {
			onSuccess(user);
			return;
		}

		onError();
	});
}
