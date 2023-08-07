import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Auth} from '@/lib/auth/auth';
import {authChangeListener} from '@/lib/dataSource/firebase/authChangeListener';
import {initializeFirebase} from '@/lib/dataSource/firebase/firebase';
import {useLoadIntoLocalStorage} from '@/lib/dataSource/useLoadIntoLocalStorage';
import {useRunInBrowser} from '@/lib/helpers/useRunInBrowser';

export function useInitApp(onSuccess: VoidFn) {
	const isBrowser = useRunInBrowser();
	const loadIntoLocalStorage = useLoadIntoLocalStorage();
	const {push} = useRouter();

	useEffect(() => {
		if (isBrowser && Auth.isAuthenticated()) {
			initializeFirebase();
			authChangeListener({
				onSuccess: () =>                     loadIntoLocalStorage(() => onSuccess()),
				onError() {
					console.error('FUCK OFF');
					Auth.logout();
					push('/');
				},
			});
		}
	}, [isBrowser]);
}