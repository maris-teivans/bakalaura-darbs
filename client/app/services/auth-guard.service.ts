import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
		let url: String = state.url;

		if(this.authService.isLoggedIn()) {
			console.log('is logged in');
			return true;
		}

		return new Promise((resolve, reject) => {

			this.authService.getUserStatus().then((response: Response) => {
				let user = response.json();
				if(user.status) {
					
					this.authService.setLoggedIn(user.user);
					console.log('is logged in');
					return resolve(true);
					
				}

				this.notLoggedIn(url);
				resolve(false);
				
			}).catch((error) => {
				console.error(error);
				this.notLoggedIn(url);
				resolve(false);
			});
		});
	}

	notLoggedIn(url) {
		console.log('not logged in');
		this.authService.redirectUrl = url;

		this.router.navigate(['/login']);
	}
}