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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.loggedIn = null;
        console.log('Login service Initialized...');
    }
    AuthService.prototype.getUser = function () {
        return this.user;
    };
    AuthService.prototype.setUser = function (user) {
        this.user = user;
    };
    AuthService.prototype.setLoggedIn = function (user) {
        this.loggedIn = true;
        this.user = user;
    };
    AuthService.prototype.isLoggedIn = function () {
        if (this.loggedIn) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.getUserStatus = function () {
        return this.http.get('/api/status').toPromise();
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/api/login', { username: username, password: password })
            .map(function (response) {
            var res = response.json();
            if (res) {
                _this.user = res.user;
                _this.loggedIn = true;
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return this.http.get('/api/logout')
            .map(function (response) {
            var res = response.json();
            if (res) {
                _this.loggedIn = false;
            }
        });
    };
    AuthService.prototype.register = function (username, password, email) {
        return this.http.post('/api/register', { username: username, password: password, email: email })
            .toPromise();
    };
    AuthService.prototype.getUsernames = function () {
        return this.http.get('/api/accounts');
    };
    AuthService.prototype.updateUser = function (user) {
        return this.http.put('/api/user/' + user._id, user).toPromise();
    };
    AuthService.prototype.matchPassword = function (username, password) {
        return this.http.post('/api/password', { username: username, password: password })
            .toPromise();
    };
    AuthService.prototype.savePassword = function (username, password) {
        return this.http.post('/api/setPassword', { username: username, password: password })
            .toPromise();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map