import { Component, OnInit } from '@angular/core';
import { Router } 			 from '@angular/router';
import { Response } from '@angular/http';

import { AuthService } from '../../services/auth.service';

@Component({
	moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent { 
	localUser = {
		username: '',
		password: ''
	};
	errorMessage: String;

	constructor (private authService:AuthService, private router: Router){
	}

	login() {
		this.authService.login(this.localUser.username, this.localUser.password).subscribe(
			user => {
				this.router.navigate(['/home']);
			},
			(error) => {
				if(error.status === 401) {
					this.errorMessage = 'Nepareizs lietotāja vārds vai parole';
				} else {
					this.errorMessage = error.statusText;
				}
			});
	}
}