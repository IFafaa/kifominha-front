import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'default-back',
  templateUrl: './default-back.component.html',
  styleUrls: ['./default-back.component.scss'],
})
export class DefaultBackComponent {
  constructor(private readonly location: Location) {}

  back() {
    this.location.back();
  }
}
