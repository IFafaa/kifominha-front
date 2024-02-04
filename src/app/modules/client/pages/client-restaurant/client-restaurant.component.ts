import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable } from 'rxjs';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';

@Component({
  selector: 'app-client-restaurant',
  templateUrl: './client-restaurant.component.html',
  styleUrls: ['./client-restaurant.component.scss'],
})
export class ClientRestaurantComponent implements OnInit {
  restaurant!: IRestaurant;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getRestaurant(params['id']);
    });
  }

  getRestaurant(restaurantId: string) {
    this.restaurantService.getRestaurant(restaurantId).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
    });
  }
}
