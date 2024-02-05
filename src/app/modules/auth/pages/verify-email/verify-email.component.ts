import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ENUM_USER_TYPE } from 'src/app/shared/enums/user-type.enum';
import { ToastrService } from '../../../../core/services/toastr.service';
import { TokenService } from 'src/app/core/services/token.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  codeControl = this.fb.control('', [
    Validators.minLength(6),
    Validators.required,
  ]);
  type!: ENUM_USER_TYPE;
  idUser!: string;

  time!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
    private readonly tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.idUser = params['id'];
    });

    this.startTimer();
  }

  startTimer() {
    this.time = 30;
    const interval = setInterval(() => {
      if (this.time === 0) {
        clearInterval(interval);
      } else {
        this.time--;
      }
    }, 1000);
  }

  sendAuthEmail() {
    this.authService
      .sendAuthEmail(this.idUser)
      .pipe(finalize(() => this.startTimer()))
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
        },
      });
  }

  verifyCode() {
    if (this.codeControl.invalid) {
      return;
    }

    this.authService
      .verifyEmail(this.codeControl.value!, this.type, this.idUser)
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        },
      });
  }
}
