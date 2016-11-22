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
var RegisterComponent = (function () {
    function RegisterComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.isRegistered = false;
        this.localUser = {
            username: '',
            password: '',
            password_confirmation: '',
            email: ''
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (res) { return _this.regUsers = res['usernames'].json(); });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        event.preventDefault();
        if (this.localUser.username == '') {
            this.error = 'Nav norādīts lietotāja vārds.';
        }
        else if (this.existsUsername(this.localUser.username)) {
            this.error = 'Šāds lietotāja vārds jau ir reģistrēts, lūdzu izvēlieties citu.';
        }
        else if (this.localUser.email == '') {
            this.error = 'Nav norādīts e-pasts.';
        }
        else if (this.existsEmail(this.localUser.email)) {
            this.error = 'Šāds e-pasts jau ir reģistrēts, lūdzu izvēlieties citu.';
        }
        else if (this.localUser.password == '') {
            this.error = 'Nav norādīta parole.';
        }
        else if (this.localUser.password_confirmation == '') {
            this.error = 'Nav atkāroti norādīta parole.';
        }
        else if (this.localUser.password !== this.localUser.password_confirmation) {
            this.error = 'Atkārtotā parole nesakrīt ar ievadīto paroli.';
        }
        else {
            this.error = '';
            this.authService.register(this.localUser.username, this.localUser.password, this.localUser.email)
                .then(function (response) {
                var user = response.json();
                if (user) {
                    _this.isRegistered = true;
                }
                else {
                    _this.error = 'error';
                }
            });
        }
    };
    RegisterComponent.prototype.existsUsername = function (username) {
        for (var i = this.regUsers.length - 1; i >= 0; i--) {
            if (this.regUsers[i].username === username) {
                return true;
            }
        }
        return false;
    };
    RegisterComponent.prototype.existsEmail = function (email) {
        for (var i = this.regUsers.length - 1; i >= 0; i--) {
            if (this.regUsers[i].email === email) {
                return true;
            }
        }
        return false;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html',
            styleUrls: ['register.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map