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
var RoomComponent = (function () {
    function RoomComponent(authService, roomService, router, route) {
        this.authService = authService;
        this.roomService = roomService;
        this.router = router;
        this.route = route;
        this.isNew = true;
        this.roomAdEd = false;
        this.errorTagNames = [];
        this.tags = [];
    }
    RoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.getUser();
        this.route.data.subscribe(function (res) { return _this.regUsers = res['usernames'].json(); });
        if (this.route.snapshot.params['id']) {
            this.isNew = false;
        }
        else {
            this.room = new room_1.Room;
            this.room.isPrivate = false;
        }
    };
    RoomComponent.prototype.saveRoom = function (event) {
        var _this = this;
        event.preventDefault();
        this.error = '';
        this.errorTags = '';
        this.errorTagNames = [];
        if (this.room.title == '' || this.room.title == undefined) {
            this.error = 'Jānorāda istabas nosaukums.';
        }
        else if (this.tags.length == 0 && this.room.isPrivate == true) {
            this.errorTags = 'Jānorāda vismaz viens lietotājas, kas bez Jums varēs piekļūt šai istabai.';
        }
        else if (this.areUsernames(this.tags) == false && this.room.isPrivate == true) {
            this.errorTags = this.errorTagNames.toString() + ' lietotājs(-i) nav reģistrēts(-i)';
        }
        else {
            var newRoom = {
                title: this.room.title,
                isPrivate: this.room.isPrivate,
                allowedIds: this.room.allowedIds,
                userCount: 0,
                users: [],
                tags: [],
                ownerId: this.user._id,
                feed: []
            };
            this.roomService.addRoom(newRoom).then(function (response) {
                var room = response.json();
                if (room) {
                    _this.error = '';
                    _this.router.navigate(['/home/roomSuccess/' + _this.isNew], true);
                }
            });
        }
    };
    RoomComponent.prototype.areUsernames = function (tags) {
        var temp = '';
        for (var i = 0; i < tags.length; i++) {
            temp = '';
            for (var j = 0; j < this.regUsers.length; j++) {
                if (this.regUsers[j].username == tags[i]) {
                    temp = this.regUsers[j]._id;
                }
            }
            if (temp == '') {
                this.errorTagNames.push(tags[i]);
            }
            else {
                this.room.allowedIds.push(temp);
            }
        }
        if (this.errorTagNames.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    RoomComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'room',
            templateUrl: 'room.component.html',
            styleUrls: ['room.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, room_service_1.RoomService, router_1.Router, router_1.ActivatedRoute])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;
//this.user.username = route.snapshot.params['username']; 
//# sourceMappingURL=room.component.js.map