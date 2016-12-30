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
var room_service_1 = require('../../services/room.service');
var auth_service_1 = require('../../services/auth.service');
var io = require('socket.io-client');
var RoomsComponent = (function () {
    function RoomsComponent(roomService, authService, router) {
        this.roomService = roomService;
        this.authService = authService;
        this.router = router;
        this.socket = null;
    }
    RoomsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.getUser();
        this.roomService.getRooms().then(function (response) {
            var res = response.json();
            if (res) {
                _this.rooms = res;
            }
        });
    };
    RoomsComponent.prototype.enterRoom = function (id) {
        this.socket = io('http://localhost:8000');
        this.router.navigate(['home/chat/' + id]);
        this.socket.emit('newUser', { 'username': this.user.username, 'roomId': id });
    };
    RoomsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rooms',
            templateUrl: 'rooms.component.html',
            styleUrls: ['rooms.component.css']
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, auth_service_1.AuthService, router_1.Router])
    ], RoomsComponent);
    return RoomsComponent;
}());
exports.RoomsComponent = RoomsComponent;
//# sourceMappingURL=rooms.component.js.map