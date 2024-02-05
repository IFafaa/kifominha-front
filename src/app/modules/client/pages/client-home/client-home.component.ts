import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { IClient } from 'src/app/core/services/interfaces/client.interface';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { Observable, share } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Router } from '@angular/router';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { FoodService } from '../../../../core/services/food.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsComponent } from '../../components/food-details/food-details.component';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  client = this.userService.tokenDecoded<IClient>();
  restaurants$: Observable<IRestaurant[]> = new Observable();
  foods$: Observable<IFood[]> = new Observable();
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
    private readonly foodService: FoodService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.getFoods();
  }

  search(searchText: string) {
    this.getFoods(searchText);
    this.getRestaurants(searchText);
  }

  viewFood(food: IFood) {
    const dialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
      data: food,
    };
    this.matDialog.open(FoodDetailsComponent, dialogConfig).afterClosed();
  }
  getRestaurants(filter?: string) {
    this.restaurants$ = this.restaurantService
      .getRestaurants()
      .pipe(share(), debounceTime(2000));
  }

  getFoods(filter?: string) {
    const foodFilter = {
      description: filter,
      name: filter,
    };
    this.foods$ = this.foodService
      .getFoods(foodFilter)
      .pipe(share(), debounceTime(2000));
  }

  viewRestaurant(restaurantId: string) {
    this.router.navigate([`/client/restaurant/${restaurantId}`]);
  }
}
