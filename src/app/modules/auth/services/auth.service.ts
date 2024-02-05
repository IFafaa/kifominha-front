import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../interfaces/login.interface';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { IRequest } from 'src/app/core/services/interfaces/request.interface';
import {
  IRegisterClient,
  IRegisterClientResponse,
} from '../interfaces/register-client.interface';
import {
  IRegisterRestaurant,
  IRegisterRestaurantResponse,
} from '../interfaces/register-restaurant.interface';
import { ENUM_USER_TYPE } from 'src/app/core/enums/user-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  signIn(login: ILogin): Observable<IRequest<ILoginResponse>> {
    return this.http.post<IRequest<ILoginResponse>>(
      `${environment.api}auth/login`,
      login
    );
  }

  registerClient(
    registerClient: IRegisterClient
  ): Observable<IRequest<IRegisterClientResponse>> {
    return this.http.post<IRequest<IRegisterClientResponse>>(
      `${environment.api}auth/register/client`,
      registerClient
    );
  }

  registerRestaurant(
    registerRestaurant: IRegisterRestaurant
  ): Observable<IRequest<IRegisterRestaurantResponse>> {
    return this.http.post<IRequest<IRegisterRestaurantResponse>>(
      `${environment.api}auth/register/restaurant`,
      registerRestaurant
    );
  }

  verifyEmail(
    code: string,
    type: ENUM_USER_TYPE,
    id: string
  ): Observable<IRequest<ILoginResponse>> {
    return this.http.post<IRequest<ILoginResponse>>(
      `${environment.api}auth/verify/${type}/email/${id}`,
      {
        code: code,
      }
    );
  }

  sendAuthEmail(id: string): Observable<IRequest<string>> {
    return this.http.post<IRequest<string>>(
      `${environment.api}auth/send/email/${id}`,
      null
    );
  }
}
