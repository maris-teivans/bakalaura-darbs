import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RoomService } from '../services/room.service';

@Injectable()
export class RoomResolver implements Resolve<any> {
  constructor (private roomService: RoomService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot) {
  	let id = this.route.snapshot.params['id'];
    return this.roomService.getRoom(id);
  }
}