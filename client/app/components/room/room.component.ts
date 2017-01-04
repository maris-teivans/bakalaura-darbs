import { Component, OnInit } 	  from '@angular/core';
import { Response } 		      from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

import { User } from '../login/user';
import { Room } from '../rooms/room';
 
@Component({
	moduleId: module.id,
    selector: 'room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})

export class RoomComponent implements OnInit {
	user: User;
	room: Room;
	isNew = true;
	roomAdEd = false;
	error: String;
	errorTags: String;
	errorTagNames = [];
	tags = [];
	regUsers: User[];

	constructor (private authService: AuthService, private roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
		this.route.data.subscribe( res => this.regUsers = res['usernames'].json());
		if(this.route.snapshot.params['id']) {
			this.isNew = false;
		} else {
			this.room = new Room;
			this.room.isPrivate = false;
		}
	}

	saveRoom(event) {
		event.preventDefault();
		this.error = '';
		this.errorTags = '';
		this.errorTagNames = [];
		if(this.room.title == '' || this.room.title == undefined) {
			this.error = 'Jānorāda istabas nosaukums.';
		} else if (this.tags.length == 0 && this.room.isPrivate == true){
			this.errorTags = 'Jānorāda vismaz viens lietotājas, kas bez Jums varēs piekļūt šai istabai.';
		} else if (this.areUsernames(this.tags) == false && this.room.isPrivate == true){
			this.errorTags = this.errorTagNames.toString() + ' lietotājs(-i) nav reģistrēts(-i)';
		} else {
			var newRoom = {
				title: this.room.title,
				isPrivate: this.room.isPrivate,
				allowedIds: this.room.allowedIds,
				userCount: 0,
				users: [],
				tags: [],
				ownerId: this.user._id,
				feed: []
			}

			this.roomService.addRoom(newRoom).then((response:Response) => {
				let room = response.json();
				if (room) {
					this.error = '';
					this.router.navigate(['/home/roomSuccess/'+this.isNew], true);
				}
			});
		}
	}

	areUsernames(tags) {
		var temp = '';
		for (var i = 0; i < tags.length; i++) {
			temp = '';
			for (var j = 0; j < this.regUsers.length; j++) {
				if(this.regUsers[j].username == tags[i]) {
					temp = this.regUsers[j]._id;
				}
			}
			if(temp == '') {
				this.errorTagNames.push(tags[i]);
			} else {
				this.room.allowedIds.push(temp);
			}
		}
		if(this.errorTagNames.length == 0) {
			return true;
		} else {
			return false;
		}
	}
}

//this.user.username = route.snapshot.params['username'];