import { Component, OnInit }      from '@angular/core';
import { Response } 		      from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

import { User } from '../login/user';
import { Room } from '../rooms/room';

import * as io from 'socket.io-client';

@Component({
	moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
	user: User;
    rooms: Room[];
    socket = null;
    editUser: User;
    oldUsername: string;
    oldEmail: string;
    errName = '';
    errEmail = '';
    editName = false;
    editEmail = false;
    regUsers: User[];

	constructor (private authService: AuthService, private roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
        this.oldUsername = this.user.username;
        this.oldEmail = this.user.email;
        this.roomService.getUserRooms(this.user._id).then((response:Response) => {
            let res = response.json();
            if (res) {
                this.rooms = res;
            }
        });
        this.route.data.subscribe( res => this.regUsers = res['usernames'].json());
	}

    enterRoom(id) {
        this.socket = io('http://localhost:8000');
        this.router.navigate(['home/chat/'+id]);
        this.socket.emit('newUser', {'username': this.user.username, 'roomId': id});
    }

    deleteRoom(id) {
        this.roomService.deleteRoom(id).then((response:Response) => {
            let res = response.json();
            if (res) {
                for (var i = 0; i < this.rooms.length; i++) {
                    if (this.rooms[i]._id == id) {
                        this.rooms.splice(i, 1);
                    }
                }
            }
        });
    }

    updateUsername() {
        if(this.user.username === this.oldUsername) {
            this.errName = '';
            this.editName = false;
            return false;
        }

        if(this.user.username === '') {
            this.errName = 'Nav norādīts lietotāja vārds.';
        } else if (this.existsUsername(this.user.username)) {
            this.errName = 'Šāds lietotāja vārds jau ir reģistrēts, lūdzu izvēlieties citu.';
        } else {
            this.errName = '';
            this.authService.updateUser(this.user)
                .then((response: Response) => {
                    let user = response.json();
                    if(user) {
                        this.authService.setUser(user);
                        this.user = user;
                        this.oldUsername = user.username;
                        this.editName = false;
                        //this.router.navigate(['/home/profile/'+user.username]);
                        location.reload();
                    } else {
                        this.errName = 'error';
                    }
                });
        }
    }

    updateEmail() {
        if(this.user.email === this.oldEmail) {
            this.errEmail = '';
            this.editEmail = false;
            return false;
        }

        if(this.user.email === '') {
            this.errEmail = 'Nav norādīts e-pasts.';
        } else if (this.existsEmail(this.user.email)) {
            this.errEmail = 'Šāds e-pasts jau ir reģistrēts, lūdzu izvēlieties citu.';
        } else {
            this.errEmail = '';
            this.authService.updateUser(this.user)
                .then((response: Response) => {
                    let user = response.json();
                    if(user) {
                        this.authService.setUser(user);
                        this.user = user;
                        this.oldEmail = user.email;
                        this.editEmail = false;
                    } else {
                        this.errEmail = 'error';
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

    cancelNameUpdate() {
        this.editName = false;
        this.errName = '';
        this.user.username = this.oldUsername;
    }

    cancelEmailUpdate() {
        this.editEmail = false;
        this.errEmail = '';
        this.user.email = this.oldEmail;
    }
}