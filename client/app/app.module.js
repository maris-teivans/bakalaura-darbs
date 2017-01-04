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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var rooms_component_1 = require('./components/rooms/rooms.component');
var home_component_1 = require('./components/home/home.component');
var profile_component_1 = require('./components/profile/profile.component');
var room_component_1 = require('./components/room/room.component');
var roomSuccess_component_1 = require('./components/roomSuccess/roomSuccess.component');
var chat_component_1 = require('./components/chat/chat.component');
var room_service_1 = require('./services/room.service');
var auth_service_1 = require('./services/auth.service');
var account_resolver_1 = require('./resolvers/account.resolver');
var room_resolver_1 = require('./resolvers/room.resolver');
var auth_guard_service_1 = require('./services/auth-guard.service');
var angular2_tag_input_1 = require('angular2-tag-input');
//import { RlTagInputModule } from '../node_modules/angular2-tag-input/index';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routing_module_1.AppRoutingModule, http_1.JsonpModule, angular2_tag_input_1.RlTagInputModule],
            declarations: [app_component_1.AppComponent, rooms_component_1.RoomsComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, home_component_1.HomeComponent, profile_component_1.ProfileComponent, room_component_1.RoomComponent, roomSuccess_component_1.RoomSuccessComponent, chat_component_1.ChatComponent],
            providers: [room_service_1.RoomService, auth_service_1.AuthService, auth_guard_service_1.AuthGuard, account_resolver_1.AccountResolver, room_resolver_1.RoomResolver],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map