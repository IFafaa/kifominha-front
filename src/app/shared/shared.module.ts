import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './layout/default-button/default-button.component';
import { DefaultBackComponent } from './layout/default-back/default-back.component';

@NgModule({
  declarations: [DefaultButtonComponent, DefaultBackComponent],
  imports: [CommonModule],
  exports: [DefaultButtonComponent, DefaultBackComponent],
})
export class SharedModule {}
