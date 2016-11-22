import { Component, OnInit }      from '@angular/core';
import { Response } 		      from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

import { User } from '../login/user';
import { Room } from '../rooms/room';

@Component({
	moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
	user: User;
    rooms: Room[];

	constructor (private authService: AuthService, private roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
        this.roomService.getUserRooms(this.user._id).then((response:Response) => {
            let res = response.json();
            if (res) {
                this.rooms = res;
            }
        });
	}

	/*deleteRoom(id) {
        var rooms = this.rooms;

        this.roomService.deleteRoom(id).then((response:Response) => {
            let data = response.json();

            if (data.n == 1) {
                for (var i = 0; i < rooms.length; i++) {
                    if (rooms[i]._id == id) {
                        rooms.splice(i, 1);
                    }
                }
            }
        })    
    }*/

    /*updateRoom(room) {
        var _room = {
            _id: room._id,
            title: room.title,
            isPrivate: !room.isPrivate
        };

        this.roomService.updateRoom(_room).then((response:Response) => {
            let data = response.json();
            
            if (data) {
                room.isPrivate = !room.isPrivate;
            }
        })
    }*/
}