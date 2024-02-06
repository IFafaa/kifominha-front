import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { FoodService } from 'src/app/core/services/food.service';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public info: {
      restaurant: IRestaurant;
      food: IFood;
    },
    private readonly ref: MatDialogRef<FoodEditComponent>,
    private readonly foodService: FoodService,
    private readonly toastrService: ToastrService
  ) {}

  close(created: boolean = false) {
    this.ref.close(created);
  }

  editFood(food: FormData) {
    food.append('restaurant_id', this.info.food.restaurant_id);
    this.foodService
      .editFood(food, this.info.food._id)
      .pipe(finalize(() => this.close(true)))
      .subscribe({
        next: () => {
          this.toastrService.success('Prato editado com sucesso!');
        },
      });
  }
}
