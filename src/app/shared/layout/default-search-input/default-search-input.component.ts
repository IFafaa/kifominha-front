import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'default-search-input',
  templateUrl: './default-search-input.component.html',
  styleUrls: ['./default-search-input.component.scss'],
})
export class DefaultSearchInputComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery = '';
}
