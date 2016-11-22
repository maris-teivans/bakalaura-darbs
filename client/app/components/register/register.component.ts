import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } 			 from '@angular/router';
import { Response } from '@angular/http';

import { AuthService } from '../../services/auth.service';
import { User } from '../login/user';

@Component({
	moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit { 
	isRegistered = false;
	error: String;
	regUsers: User[];
	localUser = {
		username: '',
		password: '',
		password_confirmation: '',
		email: ''
	}

	ngOnInit() {
		this.route.data.subscribe( res => this.regUsers = res['usernames'].json());
	}

	constructor (private authService:AuthService, private router: Router, private route: ActivatedRoute){}

	register() {
		event.preventDefault();
		if(this.localUser.username == '') {
			this.error = 'Nav norādīts lietotāja vārds.';
		} else if (this.existsUsername(this.localUser.username)) {
			this.error = 'Šāds lietotāja vārds jau ir reģistrēts, lūdzu izvēlieties citu.';
		} else if (this.localUser.email == '') {
			this.error = 'Nav norādīts e-pasts.';
		} else if (this.existsEmail(this.localUser.email)) {
			this.error = 'Šāds e-pasts jau ir reģistrēts, lūdzu izvēlieties citu.';
		} else if (this.localUser.password == '') {
			this.error = 'Nav norādīta parole.';
		} else if (this.localUser.password_confirmation == '') {
			this.error = 'Nav atkāroti norādīta parole.';
		} else if (this.localUser.password !== this.localUser.password_confirmation) {
			this.error = 'Atkārtotā parole nesakrīt ar ievadīto paroli.';
		} else {
			this.error = '';
			this.authService.register(this.localUser.username, this.localUser.password, this.localUser.email)
				.then((response: Response) => {
					let user = response.json();
					if(user) {
						this.isRegistered = true;
					} else {
						this.error = 'error';
					}
				});
		}
	}

	existsUsername(username): boolean {
		for (let i = this.regUsers.length - 1; i >= 0; i--) {
			if(this.regUsers[i].username === username) {
				return true;
			}
		}
		return false;
	}

	existsEmail(email): boolean {
		for (let i = this.regUsers.length - 1; i >= 0; i--) {
			if(this.regUsers[i].email === email) {
				return true;
			}
		}
		return false;
	}
}