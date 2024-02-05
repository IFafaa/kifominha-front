import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private readonly http: HttpClient) {}

  getRestaurants(filter?: string): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${environment.api}restaurant/`);
  }

  getRestaurant(id: string): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(`${environment.api}restaurant/${id}`);
  }
}
