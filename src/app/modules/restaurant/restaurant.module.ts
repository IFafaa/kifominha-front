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

const routes: Routes = [
  {
    path: 'home',
    component: RestaurantHomeComponent,
  },
];
@NgModule({
  declarations: [RestaurantHomeComponent, FoodListComponent, FoodFormComponent, FoodAddComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes),
    SharedModule,
    MatPaginatorModule,
  ],
})
export class RestaurantModule {}
