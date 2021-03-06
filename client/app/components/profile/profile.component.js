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
var io = require('socket.io-client');
var ProfileComponent = (function () {
    function ProfileComponent(authService, roomService, router, route) {
        this.authService = authService;
        this.roomService = roomService;
        this.router = router;
        this.route = route;
        this.socket = null;
        this.errName = '';
        this.errEmail = '';
        this.errPassword = '';
        this.editName = false;
        this.editEmail = false;
        this.editPassword = false;
        this.password = {
            old: '',
            new: '',
            newRep: ''
        };
        this.passCorrect = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.getUser();
        this.oldUsername = this.user.username;
        this.oldEmail = this.user.email;
        this.roomService.getUserRooms(this.user._id).then(function (response) {
            var res = response.json();
            if (res) {
                _this.rooms = res;
            }
        });
        this.route.data.subscribe(function (res) { return _this.regUsers = res['usernames'].json(); });
    };
    ProfileComponent.prototype.enterRoom = function (id) {
        this.socket = io('http://localhost:8000');
        this.router.navigate(['home/chat/' + id]);
        this.socket.emit('newUser', { 'username': this.user.username, 'roomId': id });
    };
    ProfileComponent.prototype.deleteRoom = function (id) {
        var _this = this;
        this.roomService.deleteRoom(id).then(function (response) {
            var res = response.json();
            if (res) {
                for (var i = 0; i < _this.rooms.length; i++) {
                    if (_this.rooms[i]._id == id) {
                        _this.rooms.splice(i, 1);
                    }
                }
            }
        });
    };
    ProfileComponent.prototype.updateUsername = function () {
        var _this = this;
        if (this.user.username === this.oldUsername) {
            this.errName = '';
            this.editName = false;
            return false;
        }
        if (this.user.username === '') {
            this.errName = 'Nav norādīts lietotāja vārds.';
        }
        else if (this.existsUsername(this.user.username)) {
            this.errName = 'Šāds lietotāja vārds jau ir reģistrēts, lūdzu izvēlieties citu.';
        }
        else {
            this.errName = '';
            this.authService.updateUser(this.user)
                .then(function (response) {
                var user = response.json();
                if (user) {
                    _this.authService.setUser(user);
                    _this.user = user;
                    _this.oldUsername = user.username;
                    _this.editName = false;
                    //this.router.navigate(['/home/profile/'+user.username]);
                    location.reload();
                }
                else {
                    _this.errName = 'error';
                }
            });
        }
    };
    ProfileComponent.prototype.updateEmail = function () {
        var _this = this;
        if (this.user.email === this.oldEmail) {
            this.errEmail = '';
            this.editEmail = false;
            return false;
        }
        if (this.user.email === '') {
            this.errEmail = 'Nav norādīts e-pasts.';
        }
        else if (this.existsEmail(this.user.email)) {
            this.errEmail = 'Šāds e-pasts jau ir reģistrēts, lūdzu izvēlieties citu.';
        }
        else {
            this.errEmail = '';
            this.authService.updateUser(this.user)
                .then(function (response) {
                var user = response.json();
                if (user) {
                    _this.authService.setUser(user);
                    _this.user = user;
                    _this.oldEmail = user.email;
                    _this.editEmail = false;
                }
                else {
                    _this.errEmail = 'error';
                }
            });
        }
    };
    ProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        if (this.password.old == '') {
            this.errPassword = 'Jānorāda esošā parole.';
        }
        else {
            this.errPassword = '';
            this.authService.matchPassword(this.user.username, this.password.old)
                .then(function (response) {
                var res = response.json();
                if (res.status === 200) {
                    _this.errPassword = '';
                    if (_this.password.new == '') {
                        _this.errPassword = 'Jānorāda jaunā parole.';
                    }
                    else if (_this.password.newRep == '') {
                        _this.errPassword = 'Jānorāda jaunā parole atkārtoti.';
                    }
                    else if (_this.password.new !== _this.password.newRep) {
                        _this.errPassword = 'Atkārtotā parole nesakrīt ar ievadīto paroli.';
                    }
                    else {
                        _this.authService.savePassword(_this.user.username, _this.password.new)
                            .then(function (response) {
                            var res = response.json();
                            if (res) {
                                alert('Parole veiksmīgi nomainīta, notiks lapas pārlāde.');
                                _this.authService.logout().subscribe(function (user) {
                                    _this.router.navigate(['/login']);
                                });
                            }
                        });
                    }
                }
                else {
                    _this.errPassword = 'Parole nav pareiza';
                }
            });
        }
    };
    ProfileComponent.prototype.existsUsername = function (username) {
        for (var i = this.regUsers.length - 1; i >= 0; i--) {
            if (this.regUsers[i].username === username) {
                return true;
            }
        }
        return false;
    };
    ProfileComponent.prototype.existsEmail = function (email) {
        for (var i = this.regUsers.length - 1; i >= 0; i--) {
            if (this.regUsers[i].email === email) {
                return true;
            }
        }
        return false;
    };
    ProfileComponent.prototype.cancelNameUpdate = function () {
        this.editName = false;
        this.errName = '';
        this.user.username = this.oldUsername;
    };
    ProfileComponent.prototype.cancelEmailUpdate = function () {
        this.editEmail = false;
        this.errEmail = '';
        this.user.email = this.oldEmail;
    };
    ProfileComponent.prototype.cancelPasswordUpdate = function () {
        this.editPassword = false;
        this.errPassword = '';
        this.password.old = '';
        this.password.new = '';
        this.password.newRep = '';
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile',
            templateUrl: 'profile.component.html',
            styleUrls: ['profile.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, room_service_1.RoomService, router_1.Router, router_1.ActivatedRoute])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map