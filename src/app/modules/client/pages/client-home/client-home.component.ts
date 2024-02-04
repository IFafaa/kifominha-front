import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { IClient } from 'src/app/core/services/interfaces/client.interface';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  client = this.userService.tokenDecoded<IClient>();
  $restaurants: Observable<IRestaurant[]> = new Observable();
  searchQuery: string = '';
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this.$restaurants = this.restaurantService.getRestaurants();
  }

  viewRestaurant(restaurantId: string) {
    this.router.navigate([`/client/restaurant/${restaurantId}`]);
  }
}
