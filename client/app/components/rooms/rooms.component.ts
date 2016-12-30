import { Component, OnInit } from '@angular/core';
import { Response }          from '@angular/http';
import { Router }            from '@angular/router';

import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

import { Room } from './room';
import { User } from '../login/user';

import * as io from 'socket.io-client';

@Component({
	moduleId: module.id,
    selector: 'rooms',
    templateUrl: 'rooms.component.html',
    styleUrls: ['rooms.component.css']
})

export class RoomsComponent implements OnInit { 
	rooms: Room[];
    user: User;
	title: string;
    socket = null;

	constructor (private roomService:RoomService, private authService: AuthService, private router: Router){
	}

	ngOnInit() {
        this.user = this.authService.getUser();
		this.roomService.getRooms().then((response:Response) => {
			let res = response.json();
			if (res) {
				this.rooms = res;
			}
		});
	}
	
    enterRoom(id) {
        this.socket = io('http://localhost:8000');
        this.router.navigate(['home/chat/'+id]);
        this.socket.emit('newUser', {'username': this.user.username, 'roomId': id});
    }
}