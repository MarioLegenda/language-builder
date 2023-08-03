import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface Props {
    onSuccess: VoidFn;
    onError: VoidFn;
}
export function authChangeListener({onSuccess, onError}: Props) {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			onSuccess();
			return;
		}

		onError();
	});
}