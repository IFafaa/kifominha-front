import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodService } from '../../../../core/services/food.service';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent implements OnInit {
  restaurant!: IRestaurant;
  quantity: number = 1;
  showRestaurant = !this.router.url.includes('restaurant');
  constructor(
    @Inject(MAT_DIALOG_DATA) public food: IFood,
    private readonly restaurantService: RestaurantService,
    private readonly ref: MatDialogRef<FoodDetailsComponent>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant() {
    this.restaurantService.getRestaurant(this.food.restaurant_id).subscribe({
      next: (res) => {
        this.restaurant = res;
      },
    });
  }

  close() {
    this.ref.close();
  }
}
