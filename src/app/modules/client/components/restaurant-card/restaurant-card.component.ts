import { Component, Input } from '@angular/core';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent {
  @Input() restaurant!: IRestaurant;
}
