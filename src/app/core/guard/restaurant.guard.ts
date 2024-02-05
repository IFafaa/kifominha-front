import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ENUM_USER_TYPE } from 'src/app/core/enums/user-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RestaurantGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.typeUser() === ENUM_USER_TYPE.RESTAURANT) {
      return true;
    } else {
      this.router.navigate([`/${this.userService.typeUser()}/home`]);
      return false;
    }
  }
}
