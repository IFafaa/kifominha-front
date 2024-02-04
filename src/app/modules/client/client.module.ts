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

const routes: Routes = [
  { path: 'home', component: ClientHomeComponent },
  { path: 'restaurant/:id', component: ClientRestaurantComponent },
];

@NgModule({
  declarations: [
    ClientHomeComponent,
    RestaurantCardComponent,
    ClientRestaurantComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class ClientModule {}
