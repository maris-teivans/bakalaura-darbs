import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccountResolver implements Resolve<any> {
  constructor (private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.getUsernames();
  }
}