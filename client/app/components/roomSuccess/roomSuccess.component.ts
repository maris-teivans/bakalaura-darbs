import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../login/user';
 
@Component({
	moduleId: module.id,
    selector: 'roomSuccess',
    templateUrl: 'roomSuccess.component.html',
    styleUrls: ['roomSuccess.component.css']
})

export class RoomSuccessComponent implements OnInit {
	user: User;
	text = 'pievienota';

	constructor (private authService: AuthService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
		if(!this.route.snapshot.params['isNew']) {
			this.text = 'labota';
		}
	}
}