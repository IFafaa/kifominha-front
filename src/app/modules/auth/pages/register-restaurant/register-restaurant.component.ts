import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cpfCnpjValidator } from 'src/app/shared/validators/cpfCnpj.validator';
import { ToastrService } from '../../../../core/services/toastr.service';
import { CepService } from '../../../../core/services/cep.service';
import { AuthService } from '../../services/auth.service';
import { IRegisterRestaurant } from '../../interfaces/register-restaurant.interface';
import { Router } from '@angular/router';
import { ENUM_USER_TYPE } from 'src/app/shared/enums/user-type.enum';
import { CategoryService } from '../../../../core/services/category.service';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/services/interfaces/category.interface';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss'],
})
export class RegisterRestaurantComponent implements OnInit {
  imageUrl!: string;
  address: string = '';
  form = this.fb.group({
    logo: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    cnpj: ['', [Validators.required, cpfCnpjValidator()]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    categories: [[], [Validators.required]],
    address: this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8)]],
      number: ['', [Validators.required]],
      state: [''],
      city: [''],
      neighborhood: [''],
      street: [''],
    }),
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  $categories = new Observable<ICategory[]>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastrService: ToastrService,
    private readonly cepService: CepService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.$categories = this.categoryService.getCategories()
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
      this.form.controls.logo.setValue(this.imageUrl);
    };
    reader.readAsDataURL(file);
  }

  validatePasswordMatch() {
    const password = this.form.controls.password;
    const confirmPassword = this.form.controls.confirmPassword;
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMatch: true });
      return;
    }
    if (!confirmPassword?.value) {
      confirmPassword?.setErrors({ required: true });
      return;
    }
    confirmPassword.setErrors(null);
  }

  setAddress(location: any): void {
    this.form.controls.address.patchValue({
      street: location.logradouro,
      neighborhood: location.bairro,
      city: location.localidade,
      state: location.uf,
    });
  }

  setAddressString(): void {
    this.form.controls.address.controls.number.enable();
    const formValue = this.form.controls.address.value;
    this.address = `${formValue.state}, ${formValue.city} - ${
      formValue.neighborhood
    }, ${formValue.street}, ${formValue.number || ''}`;
  }

  getCep(cep: string): void {
    this.form.controls.address.controls.number.disable();
    this.address = '';
    if (cep.length < 8) return;
    this.form.controls.address.controls.number.enable();
    let control = this.form.controls.address.get('cep');
    control?.setErrors(null);
    this.cepService.getCep(cep).subscribe({
      next: (res) => {
        if (res.erro) {
          let error = { invalidCep: true };
          control?.setErrors(error);
          return;
        }
        this.setAddress(res);
        this.setAddressString();
      },
    });
  }

  createAccount() {
    if (this.form.invalid) {
      return;
    }
    const restaurant = this.form.value;
    delete restaurant.confirmPassword;
    this.authService
      .registerRestaurant(restaurant as IRegisterRestaurant)
      .subscribe({
        next: (res) => {
          this.router.navigate([
            `verify-email/${res.data.id}/${ENUM_USER_TYPE.RESTAURANT}`,
          ]);
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        },
      });
  }
}
