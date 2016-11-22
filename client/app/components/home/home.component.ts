import { Component, OnInit } from '@angular/core';
import { Response } 		 from '@angular/http';
import { Router }              from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../login/user';

@Component({
	moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
	user: User;

	constructor (private authService: AuthService, private router: Router){
	}

	ngOnInit() {
		this.user = this.authService.getUser();
	}

	logout() {
        this.authService.logout().subscribe(
            user => {
                this.router.navigate(['/login']);
            });
    }
}