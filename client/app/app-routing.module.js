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
var rooms_component_1 = require('./components/rooms/rooms.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var home_component_1 = require('./components/home/home.component');
var profile_component_1 = require('./components/profile/profile.component');
var room_component_1 = require('./components/room/room.component');
var roomSuccess_component_1 = require('./components/roomSuccess/roomSuccess.component');
var chat_component_1 = require('./components/chat/chat.component');
var account_resolver_1 = require('./resolvers/account.resolver');
var auth_guard_service_1 = require('./services/auth-guard.service');
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    //{ path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        children: [
            { path: '', redirectTo: 'rooms', pathMatch: 'full' },
            { path: 'rooms', component: rooms_component_1.RoomsComponent },
            { path: 'profile/:username', component: profile_component_1.ProfileComponent, resolve: { usernames: account_resolver_1.AccountResolver } },
            { path: 'profile', redirectTo: 'rooms' },
            { path: 'room', component: room_component_1.RoomComponent, resolve: { usernames: account_resolver_1.AccountResolver } },
            { path: 'room/:id', component: room_component_1.RoomComponent },
            { path: 'roomSuccess/:isNew', component: roomSuccess_component_1.RoomSuccessComponent },
            { path: 'chat/:id', component: chat_component_1.ChatComponent }
        ],
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        resolve: {
            usernames: account_resolver_1.AccountResolver
        }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map