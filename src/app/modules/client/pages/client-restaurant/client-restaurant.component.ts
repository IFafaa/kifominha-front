import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { Observable, finalize, share } from 'rxjs';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { FoodService } from '../../../../core/services/food.service';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsComponent } from '../../components/food-details/food-details.component';
import { ICategory } from 'src/app/core/services/interfaces/category.interface';

@Component({
  selector: 'app-client-restaurant',
  templateUrl: './client-restaurant.component.html',
  styleUrls: ['./client-restaurant.component.scss'],
})
export class ClientRestaurantComponent implements OnInit {
  restaurant!: IRestaurant;
  categories: {
    category: ICategory;
    foods: IFood[];
  }[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly restaurantService: RestaurantService,
    private readonly foodService: FoodService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getRestaurant(params['id']);
    });
  }

  getRestaurant(restaurantId: string) {
    this.restaurantService
      .getRestaurant(restaurantId)
      .pipe(finalize(() => this.getFoods(restaurantId)))
      .subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          this.categories = restaurant.categories.map((category) => ({
            category: category as ICategory,
            foods: [] as IFood[],
          }));
        },
      });
  }
  getFoods(restaurantId: string) {
    this.foodService.getFoodsByRestaurant(restaurantId).subscribe({
      next: (foods) => {
        this.categories = this.categories.map((category) => ({
          ...category,
          foods: foods.filter(
            (food) => food.category._id === category.category._id
          ),
        }));
        console.log(this.categories);
      },
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
