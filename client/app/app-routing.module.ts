import { NgModule }      		 from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { RoomsComponent }    from './components/rooms/rooms.component';
import { LoginComponent }    from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent }     from './components/home/home.component';
import { ProfileComponent }  from './components/profile/profile.component';
import { RoomComponent }	 from './components/room/room.component';
import { RoomSuccessComponent} from './components/roomSuccess/roomSuccess.component';
import { ChatComponent }	   from './components/chat/chat.component';

import { AccountResolver } from './resolvers/account.resolver';
import { RoomResolver }	   from './resolvers/room.resolver';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
	{ 
		path: '',
		redirectTo: 'home',
		pathMatch: 'full' 
	},
	//{ path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
	{ 
		path: 'home',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'rooms', pathMatch: 'full' },
      		{ path: 'rooms', component: RoomsComponent },
      		{ path: 'profile/:username', component: ProfileComponent, resolve: { usernames: AccountResolver} },
      		{ path: 'profile', redirectTo: 'rooms' },
      		{ path: 'room', component: RoomComponent },
      		{ path: 'room/:id', component: RoomComponent },
      		{ path: 'roomSuccess/:isNew', component: RoomSuccessComponent },
      		{ path: 'chat/:id', component: ChatComponent }
		],
		canActivate: [AuthGuard]
	},
	{ 
		path: 'login',
		component: LoginComponent
	},
	{ 
		path: 'register',
		component: RegisterComponent,
		resolve: {
			usernames: AccountResolver
		}
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}