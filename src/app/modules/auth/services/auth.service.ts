import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../interfaces/login.interface';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { IRequest } from 'src/app/shared/interfaces/request.interface';
import {
  IRegisterClient,
  IRegisterClientResponse,
} from '../interfaces/client.interface';

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
}
