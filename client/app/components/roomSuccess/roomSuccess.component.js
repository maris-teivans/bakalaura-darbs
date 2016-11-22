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
var RoomSuccessComponent = (function () {
    function RoomSuccessComponent(authService, route) {
        this.authService = authService;
        this.route = route;
        this.text = 'pievienota';
    }
    RoomSuccessComponent.prototype.ngOnInit = function () {
        this.user = this.authService.getUser();
        if (!this.route.snapshot.params['isNew']) {
            this.text = 'labota';
        }
    };
    RoomSuccessComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'roomSuccess',
            templateUrl: 'roomSuccess.component.html',
            styleUrls: ['roomSuccess.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.ActivatedRoute])
    ], RoomSuccessComponent);
    return RoomSuccessComponent;
}());
exports.RoomSuccessComponent = RoomSuccessComponent;
//# sourceMappingURL=roomSuccess.component.js.map