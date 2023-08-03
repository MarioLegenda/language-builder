import type {User} from '@firebase/auth';

export class auth {
	private user: User | undefined;
	private key = 'user';
	login(user: User) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(this.key, JSON.stringify(user));
	}
	isAuthenticated() {
		return Boolean(localStorage.getItem(this.key));
	}
	logout() {
		localStorage.removeItem(this.key);
		this.user = undefined;
	}
}

export const Auth = new auth();