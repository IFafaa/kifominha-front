import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: ClientHomeComponent },
];

@NgModule({
  declarations: [ClientHomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientModule {}
