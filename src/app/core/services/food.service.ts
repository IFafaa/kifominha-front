import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFood } from './interfaces/food.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private readonly http: HttpClient) {}

  getFoodsByRestaurant(idRestaurant: string): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${environment.api}food/`, {
      params: {
        restaurant_id: idRestaurant,
      },
    });
  }
}
