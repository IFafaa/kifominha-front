import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRestaurant } from 'src/app/core/services/interfaces/restaurant.interface';
import { ToastrService } from '../../../../core/services/toastr.service';
import { IFood } from 'src/app/core/services/interfaces/food.interface';
import { UploadService } from '../../../../core/services/upload.service';
import { FormDataHelper } from 'src/app/core/helpers/form-data.helper';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss'],
})
export class FoodFormComponent implements OnInit {
  @Input() restaurant!: IRestaurant;
  @Input() food?: IFood;
  @Output() sendFormCallback = new EventEmitter<Partial<IFood>>();
  imageUrl!: string;

  form = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    serve: [1, [Validators.required, Validators.min(1)]],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastrService: ToastrService,
    private readonly uploadService: UploadService
  ) {}

  ngOnInit(): void {
    if (this.food) this.setFormValues();
  }

  setFormValues() {
    this.imageUrl = this.food?.image as any;
    this.form.patchValue(this.food as any);
    this.form.controls.category.setValue(this.food?.category._id as any);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (this.isFileSizeValid(file)) {
        this.previewImage(file);
      } else {
        this.toastrService.error('A imagem deve ter menos de 1 MB');
      }
    }
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  previewImage(file: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.form.controls.image.setValue(file);
    };
    reader.readAsDataURL(file);
  }

  async sendForm() {
    if (this.form.invalid) return;
    const food = {
      ...this.form.value,
      category: this.restaurant.categories.find(
        (category) => category._id === this.form.value.category
      )!,
    };
    const formData = FormDataHelper.objectToFormData(food as any);
    this.sendFormCallback.emit(formData as any);
  }
}
