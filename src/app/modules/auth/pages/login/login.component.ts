import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/login.interface';
import { TokenService } from '../../../../core/services/token.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.tokenService.removeToken();
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }
    this.authService.signIn(this.form.value as ILogin).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.data.access_token);
        this.router.navigate([`/${this.userService.typeUser()}/home`]);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}
