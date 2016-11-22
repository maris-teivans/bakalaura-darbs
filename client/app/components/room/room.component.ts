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

	constructor (private authService: AuthService, private roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
		if(this.route.snapshot.params['id']) {
			this.isNew = false;
			// code...
		} else {
			this.room = new Room;
		}
	}

	saveRoom(event) {
		event.preventDefault();
		if(this.room.title !== '') {
			var newRoom = {
				title: this.room.title,
				isPrivate: this.room.isPrivate,
				allowedIds: [],
				userCount: 0,
				users: [],
				tags: [],
				ownerId: this.user._id,
				feed: []
			}

			this.roomService.addRoom(newRoom).then((response:Response) => {
					let room = response.json();
					if (room) {
						this.router.navigate(['/home/roomSuccess/'+this.isNew], true);
					}
				});
		}
	}
}

//this.user.username = route.snapshot.params['username'];