import { Component, Input } from '@angular/core';
import { IFood } from 'src/app/core/services/interfaces/food.interface';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent {
  @Input() food!: IFood;
}
