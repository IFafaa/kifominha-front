import { Component, Input, OnInit } from '@angular/core';
import { ENUM_STATUS_LIST } from 'src/app/core/enums/list-status.enum';
import { FoodService } from '../../../../core/services/food.service';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FoodAddComponent } from '../food-add/food-add.component';
import { ToastrService } from '../../../../core/services/toastr.service';
import { finalize } from 'rxjs';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { FoodEditComponent } from '../food-edit/food-edit.component';

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

  constructor(
    private readonly foodService: FoodService,
    private readonly matDialog: MatDialog,
    private readonly toastrService: ToastrService,
    private readonly confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.statusList = ENUM_STATUS_LIST.IDLE;
    this.foodService.getFoodsByRestaurant(this.restaurant._id).subscribe({
      next: (foods) => {
        this.foods = foods;
        if (!foods.length) {
          this.statusList = ENUM_STATUS_LIST.NOTFOUND;
        }
      },
      error: (err) => {
        this.statusList = ENUM_STATUS_LIST.ERROR;
      },
    });
  }

  addFood() {
    const dialogConfig: MatDialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
      data: this.restaurant,
    };
    this.matDialog
      .open(FoodAddComponent, dialogConfig)
      .afterClosed()
      .subscribe((created: boolean) => {
        if (created) {
          this.getFoods();
        }
      });
  }

  editFood(food: IFood) {
    const dialogConfig: MatDialogConfig = {
      position: {
        right: '0',
        top: '0',
      },
      minHeight: '100vh',
      maxWidth: '420px',
      data: {
        restaurant: this.restaurant,
        food: food,
      },
    };
    this.matDialog
      .open(FoodEditComponent, dialogConfig)
      .afterClosed()
      .subscribe((edited: boolean) => {
        if (edited) {
          this.getFoods();
        }
      });
  }

  deleteFood(food: IFood) {
    const titleDialog = 'Deletar Prato';
    const descDialog = 'Você realmente deseja deletar essa prato?';
    this.confirmDialogService.confirm(titleDialog, descDialog, () => {
      this.foodService
        .deleteFood(food)
        .pipe(
          finalize(() => {
            this.getFoods();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastrService.success('Prato deletado com sucesso!');
          },
        });
    });
  }
}
