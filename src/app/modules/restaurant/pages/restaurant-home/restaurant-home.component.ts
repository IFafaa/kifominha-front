import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss'],
})
export class RestaurantHomeComponent implements OnInit {
  restaurant$ = new Observable<IRestaurant>();

  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.getRestauarnt(this.userService.tokenDecoded<IRestaurant>()._id);
  }

  getRestauarnt(id: string) {
    this.restaurant$ = this.restaurantService.getRestaurant(id);
  }
}
