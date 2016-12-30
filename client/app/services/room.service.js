"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var RoomService = (function () {
    function RoomService(http) {
        this.http = http;
        console.log('Room service Initialized...');
    }
    RoomService.prototype.getRooms = function () {
        return this.http.get('/api/rooms').toPromise();
    };
    RoomService.prototype.getRoom = function (id) {
        return this.http.get('/api/room/' + id).toPromise();
    };
    RoomService.prototype.addRoom = function (newRoom) {
        return this.http.post('/api/room', newRoom).toPromise();
    };
    RoomService.prototype.deleteRoom = function (id) {
        return this.http.delete('/api/room/' + id).toPromise();
    };
    RoomService.prototype.updateRoom = function (room) {
        return this.http.put('/api/room/' + room._id, room).toPromise();
    };
    RoomService.prototype.getUserRooms = function (userId) {
        return this.http.get('/api/rooms/' + userId).toPromise();
    };
    RoomService = __decorate([
        core_1.Injectable()
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
