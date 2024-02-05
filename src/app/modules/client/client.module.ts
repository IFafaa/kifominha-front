import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientRestaurantComponent } from './pages/client-restaurant/client-restaurant.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ClientGuard } from 'src/app/core/guard/client.guard';

const routes: Routes = [
  {
    path: 'home',
    component: ClientHomeComponent,
    canActivate: [AuthGuard, ClientGuard],
  },
  {
    path: 'restaurant/:id',
    component: ClientRestaurantComponent,
    canActivate: [AuthGuard, ClientGuard],
  },
];

@NgModule({
  declarations: [
    ClientHomeComponent,
    RestaurantCardComponent,
    ClientRestaurantComponent,
    FoodCardComponent,
    FoodDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    NgxMaskModule.forChild(),
    SharedModule,
  ],
})
export class ClientModule {}
