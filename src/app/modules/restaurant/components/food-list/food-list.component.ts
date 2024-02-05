import { Component, Input, OnInit } from '@angular/core';
import { ENUM_STATUS_LIST } from 'src/app/shared/enums/list-status.enum';
import { FoodService } from '../../../../core/services/food.service';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { IFood } from 'src/app/core/services/interfaces/food.interface';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  @Input() restaurant!: IRestaurant;
  public ENUM_STATUS_LIST = ENUM_STATUS_LIST;
  statusList: ENUM_STATUS_LIST = ENUM_STATUS_LIST.IDLE;
  pageIndex: number = 0;
  foods!: IFood[];

  constructor(private readonly foodService: FoodService) {}

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoodsByRestaurant(this.restaurant._id).subscribe({
      next: (foods) => {
        this.foods = foods;
        if (!this.foods.length) {
          this.statusList = ENUM_STATUS_LIST.NOTFOUND;
        }
      },
      error: (err) => {
        this.statusList = ENUM_STATUS_LIST.ERROR;
      },
    });
  }

  addFood() {}
}
