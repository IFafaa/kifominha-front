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
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { MatSelectModule } from '@angular/material/select';

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
  {
    path: 'verify-email/:id/:type',
    component: VerifyEmailComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterRestaurantComponent,
    RegisterClientComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    MatSelectModule,
  ],
})
export class AuthModule {}
