import { Component, OnInit, Input, OnDestroy } 	  from '@angular/core';
import { Response } 		      from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

import { User } from '../login/user';
import { Room } from '../rooms/room';

import * as io from 'socket.io-client';
 
@Component({
	moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {
	user: User;
	room: Room;
	message = '';
	conversation = [];
	socket = null;
	userList = [];

	constructor (private authService: AuthService, private roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.user = this.authService.getUser();
		//this.room = new Room();
		if(this.route.snapshot.params['id']) {
			this.room = new Room();
			this.room._id = this.route.snapshot.params['id'];
			this.roomService.getRoom(this.route.snapshot.params['id']).then((response: Response) => {
				let res = response.json();
				if(res) {
					this.room = res;
				}
			})
		}

		this.socket = io('http://localhost:8000');
        this.socket.on('chatUpdate', function(data) {
            if(data.roomId === this.room._id) {
            	this.conversation.push(data);
            	if(this.isNewUserAlert(data)) {
            		if(this.userList.indexOf(data.usrN) === -1) {
            			this.userList.push(data.usrN);
            		}
            	}
            	if(this.ifUserLeft(data)) {
            		if(this.userList.indexOf(data.usrN) !== -1) {
            			this.userList.splice(this.userList.indexOf(data.usrN), 1);
            		}
            	}
            }
            //this.updateScroll();
        }.bind(this));
	}

	send() {
		this.socket.emit('newMessage', {
            'userName': this.user.username,
            'text': this.message,
            'roomId': this.room._id
        });
        this.message = '';
	}

	keypressHandler(event) {
        if (event.keyCode === 13){
            this.send();
        }
    } 
 
    isNewUserAlert(data) {
        return data.userName === '';
    }

    ifUserLeft(data) {
    	if(data.exit) {
    		return data.exit === true;
    	}
        return false;
    }

    updateScroll() {
	    let element = document.getElementById("chatBox");
	    if(element !== null) {
	    	element.scrollTop = element.scrollHeight;
	    }	    
	}

	ngOnDestroy() {
		this.socket.emit('userLeft', {
            'userName': '',
            'text': this.user.username + ' has left the channel',
            'roomId': this.room._id,
            'exit': true,
            'usrN': this.user.username
        });
	}

	/*isOverflowed(element){
	    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	}*/
}