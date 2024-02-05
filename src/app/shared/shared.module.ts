import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './layout/default-button/default-button.component';
import { DefaultBackComponent } from './layout/default-back/default-back.component';
import { DefaultSearchInputComponent } from './layout/default-search-input/default-search-input.component';
import { FormsModule } from '@angular/forms';
import { PaginacaoDirective } from './directives/pagination.directive';

@NgModule({
  declarations: [
    DefaultButtonComponent,
    DefaultBackComponent,
    DefaultSearchInputComponent,
    PaginacaoDirective,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DefaultButtonComponent,
    DefaultBackComponent,
    DefaultSearchInputComponent,
    PaginacaoDirective,
  ],
})
export class SharedModule {}
