import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './layout/default-button/default-button.component';
import { DefaultBackComponent } from './layout/default-back/default-back.component';
import { DefaultSearchInputComponent } from './layout/default-search-input/default-search-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DefaultButtonComponent,
    DefaultBackComponent,
    DefaultSearchInputComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DefaultButtonComponent,
    DefaultBackComponent,
    DefaultSearchInputComponent,
  ],
})
export class SharedModule {}
