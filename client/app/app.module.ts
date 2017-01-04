import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }    from './app-routing.module';

import { AppComponent }   	   from './app.component';
import { LoginComponent }      from './components/login/login.component';
import { RegisterComponent }   from './components/register/register.component';
import { RoomsComponent }      from './components/rooms/rooms.component';
import { HomeComponent }       from './components/home/home.component';
import { ProfileComponent }    from './components/profile/profile.component';
import { RoomComponent }	   from './components/room/room.component';
import { RoomSuccessComponent} from './components/roomSuccess/roomSuccess.component';
import { ChatComponent }	   from './components/chat/chat.component';

import { RoomService } from './services/room.service';
import { AuthService } from './services/auth.service';

import { AccountResolver } from './resolvers/account.resolver';
import { RoomResolver }	   from './resolvers/room.resolver';

import { AuthGuard } from './services/auth-guard.service';

import { RlTagInputModule } from 'angular2-tag-input';
//import { RlTagInputModule } from '../node_modules/angular2-tag-input/index';

@NgModule({
	imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule, JsonpModule, RlTagInputModule ],
	declarations: [ AppComponent, RoomsComponent, LoginComponent, RegisterComponent, HomeComponent, ProfileComponent, RoomComponent, RoomSuccessComponent, ChatComponent ],
	providers:    [ RoomService, AuthService, AuthGuard, AccountResolver, RoomResolver ],
	bootstrap:    [ AppComponent ]
})

export class AppModule { }