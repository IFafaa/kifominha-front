import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cpfCnpjValidator } from 'src/app/core/validators/cpfCnpj.validator';
import { AuthService } from '../../services/auth.service';
import { IRegisterClient } from '../../models/register-client.interface';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { ENUM_USER_TYPE } from 'src/app/core/enums/user-type.enum';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required, cpfCnpjValidator()]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

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

  createAccount() {
    if (this.form.invalid) {
      return;
    }
    const client = this.form.value;
    delete client.confirmPassword;
    this.authService.registerClient(client as IRegisterClient).subscribe({
      next: (res) => {
        this.router.navigate([
          `verify-email/${res.data.id}/${ENUM_USER_TYPE.CLIENT}`,
        ]);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}
