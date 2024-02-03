import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/login.interface';
import { TokenService } from '../../../../core/services/token.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  signIn() {
    if (this.form.invalid) {
      return;
    }
    this.authService.signIn(this.form.value as ILogin).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.data.access_token);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}