import type { User } from '@firebase/auth';

export class auth {
	private user: User | undefined;
	private key = 'user';

	constructor() {
		if (typeof localStorage === 'undefined') {
			return;
		}

		const item = localStorage.getItem(this.key);
		if (item) {
			this.user = JSON.parse(item) as User;
		}
	}
	login(user: User) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		this.user = user;
		localStorage.setItem(this.key, JSON.stringify(user));
	}
	isAuthenticated() {
		return Boolean(localStorage.getItem(this.key)) && this.user && this.user.email === 'marioskrlec222@gmail.com';
	}
	logout() {
		localStorage.removeItem(this.key);
		this.user = undefined;
	}
}

export const Auth = new auth();
