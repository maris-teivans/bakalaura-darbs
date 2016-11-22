import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {
	constructor (private http:Http) {
		console.log('Room service Initialized...');
	}

	getRooms(): Promise<Response> {
		return this.http.get('/api/rooms').toPromise();
	}

	getRoom(id): Promise<Response> {
		return this.http.get('/api/room/' + id).toPromise();
	}

	addRoom(newRoom): Promise<Response> {
		return this.http.post('/api/room', newRoom).toPromise();
	}

	deleteRoom(id): Promise<Response> {
		return this.http.delete('/api/room/' + id).toPromise();
	}

	updateRoom(room): Promise<Response> {
		return this.http.put('/api/room/' + room._id, room).toPromise();
	}

	getUserRooms(userId): Promise<Response> {
		return this.http.get('/api/rooms/' + userId).toPromise();
	}
}