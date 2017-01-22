"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../../services/auth.service');
var room_service_1 = require('../../services/room.service');
var room_1 = require('../rooms/room');
var io = require('socket.io-client');
var ChatComponent = (function () {
    function ChatComponent(authService, roomService, router, route) {
        this.authService = authService;
        this.roomService = roomService;
        this.router = router;
        this.route = route;
        this.message = '';
        this.conversation = [];
        this.socket = null;
        this.userList = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.getUser();
        //this.room = new Room();
        if (this.route.snapshot.params['id']) {
            this.room = new room_1.Room();
            this.room._id = this.route.snapshot.params['id'];
            this.roomService.getRoom(this.route.snapshot.params['id']).then(function (response) {
                var res = response.json();
                if (res) {
                    _this.room = res;
                    _this.conversation = res.feed;
                    console.log(res.feed);
                }
            });
        }
        this.socket = io('http://localhost:8000');
        this.socket.on('chatUpdate', function (data) {
            if (data.roomId === this.room._id) {
                this.conversation.push(data);
                console.log(this.conversation);
                this.room.feed = this.conversation;
                this.roomService.updateRoom(this.room).then(function (response) { });
                if (this.isNewUserAlert(data)) {
                    if (this.userList.indexOf(data.usrN) === -1) {
                        this.userList.push(data.usrN);
                    }
                }
                if (this.ifUserLeft(data)) {
                    if (this.userList.indexOf(data.usrN) !== -1) {
                        this.userList.splice(this.userList.indexOf(data.usrN), 1);
                    }
                }
            }
            //this.updateScroll();
        }.bind(this));
    };
    ChatComponent.prototype.send = function () {
        this.socket.emit('newMessage', {
            'userName': this.user.username,
            'text': this.message,
            'roomId': this.room._id
        });
        this.message = '';
    };
    ChatComponent.prototype.keypressHandler = function (event) {
        if (event.keyCode === 13) {
            this.send();
        }
    };
    ChatComponent.prototype.isNewUserAlert = function (data) {
        return data.userName === '';
    };
    ChatComponent.prototype.ifUserLeft = function (data) {
        if (data.exit) {
            return data.exit === true;
        }
        return false;
    };
    ChatComponent.prototype.updateScroll = function () {
        var element = document.getElementById("chatBox");
        if (element !== null) {
            element.scrollTop = element.scrollHeight;
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this.socket.emit('userLeft', {
            'userName': '',
            'text': this.user.username + ' has left the channel',
            'roomId': this.room._id,
            'exit': true,
            'usrN': this.user.username
        });
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat',
            templateUrl: 'chat.component.html',
            styleUrls: ['chat.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, room_service_1.RoomService, router_1.Router, router_1.ActivatedRoute])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map