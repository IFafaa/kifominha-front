import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { FoodService } from '../../../../core/services/food.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss'],
})
export class FoodAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public restaurant: IRestaurant,
    private readonly ref: MatDialogRef<FoodAddComponent>,
    private readonly foodService: FoodService,
    private readonly toastrService: ToastrService
  ) {}

  close(created: boolean = false) {
    this.ref.close(created);
  }

  createFood(food: Partial<IFood>) {
    this.foodService
      .registerFood(food as Omit<IFood, '_id'>)
      .pipe(finalize(() => this.close(true)))
      .subscribe({
        next: () => {
          this.toastrService.success('Prato criado com sucesso!');
        },
      });
  }
}
