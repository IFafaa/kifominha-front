import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable, share } from 'rxjs';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { FoodService } from '../../../../core/services/food.service';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsComponent } from '../../components/food-details/food-details.component';

@Component({
  selector: 'app-client-restaurant',
  templateUrl: './client-restaurant.component.html',
  styleUrls: ['./client-restaurant.component.scss'],
})
export class ClientRestaurantComponent implements OnInit {
  restaurant!: IRestaurant;
  foods$ = new Observable<IFood[]>();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly restaurantService: RestaurantService,
    private readonly foodService: FoodService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getRestaurant(params['id']);
      this.getFoods(params['id']);
    });
  }

  getRestaurant(restaurantId: string) {
    this.restaurantService.getRestaurant(restaurantId).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
    });
  }
  getFoods(restaurantId: string) {
    this.foods$ = this.foodService
      .getFoodsByRestaurant(restaurantId)
      .pipe(share());
  }

  hasFood(categoryId: string, foods: IFood[]) {
    return foods.find((food) => {
      food.category._id === categoryId;
    });
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
}
