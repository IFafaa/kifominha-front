import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantHomeComponent } from './pages/restaurant-home/restaurant-home.component';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './components/food-list/food-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FoodFormComponent } from './components/food-form/food-form.component';
import { FoodAddComponent } from './components/food-add/food-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FoodEditComponent } from './components/food-edit/food-edit.component';
import { RestaurantGuard } from 'src/app/core/guard/restaurant.guard';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: RestaurantHomeComponent,
    canActivate: [AuthGuard, RestaurantGuard],

  },
];
@NgModule({
  declarations: [RestaurantHomeComponent, FoodListComponent, FoodFormComponent, FoodAddComponent, FoodEditComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes),
    SharedModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
})
export class RestaurantModule {}
