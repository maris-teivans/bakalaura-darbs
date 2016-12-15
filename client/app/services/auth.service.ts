import { Injectable,  } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { User } from '../components/login/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
	user: User;
	loggedIn = null;
	redirectUrl: String;

	constructor (private http:Http) {
		console.log('Login service Initialized...');
	}

	getUser() {
		return this.user;
	}

	setUser(user) {
		this.user = user;
	}

	setLoggedIn(user) {
		this.loggedIn = true;
		this.user = user;
	}

	isLoggedIn() {
		if (this.loggedIn) {
			return true;
		} else {
			return false;
		}
	}

	getUserStatus(): Promise<Response> {
		return this.http.get('/api/status').toPromise();
	}

	login(username, password) {
		return this.http.post('/api/login', {username: username, password: password})
			.map((response: Response) => {
				let res = response.json();
				if(res) {
					this.user = res.user;
					this.loggedIn = true;
				} else {
					this.loggedIn = false;
				}
			});
	}

	logout() {
		return this.http.get('/api/logout')
			.map((response: Response) => {
				let res = response.json();
				if(res) {
					this.loggedIn = false;
				}
			});
	}

	register(username, password, email) {
		return this.http.post('/api/register', {username: username, password: password, email: email})
			.toPromise();
	}

	getUsernames() {
		return this.http.get('/api/accounts');
	}

	updateUser(user): Promise<Response> {
		return this.http.put('/api/user/' + user._id, user).toPromise();
	}
}