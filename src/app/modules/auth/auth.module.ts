import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register/restaurant',
    component: RegisterRestaurantComponent,
  },
  {
    path: 'register/client',
    component: RegisterClientComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterRestaurantComponent,
    RegisterClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
})
export class AuthModule {}
