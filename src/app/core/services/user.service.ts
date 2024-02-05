import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { IClient } from './interfaces/client.interface';
import { IRestaurant } from './interfaces/restaurant.interface';
import { ENUM_USER_TYPE } from 'src/app/core/enums/user-type.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly tokenService: TokenService) {}

  tokenDecoded<T>(): T {
    return jwtDecode(this.tokenService.getToken()!);
  }

  typeUser() {
    return this.tokenDecoded<any>()?.cnpj
      ? ENUM_USER_TYPE.RESTAURANT
      : ENUM_USER_TYPE.CLIENT;
  }
}
