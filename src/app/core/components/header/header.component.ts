import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TokenService } from '../../services/token.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule],
})
export class HeaderComponent {
  routesToHidden = [
    '/',
    '/register/client',
    '/register/restaurant',
    '/verify-email/:id/:type',
  ];
  url!: string;
  hasLogged!: boolean;
  constructor(
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly confirmDialogService: ConfirmDialogService
  ) {
    this.url = router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasLogged = tokenService.getToken() !== null;
        this.url = event.url;
      }
    });
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }

  deleteUser() {
    const titleDialog = 'Deletar Conta';
    const descDialog = 'Você realmente deseja deletar a sua conta?';
    this.confirmDialogService.confirm(titleDialog, descDialog, () => {
      this.authService.deleteUser().subscribe({
        next: () => {
          this.tokenService.removeToken();
          this.router.navigate(['/']);
          this.toastrService.success('Conta deletada com sucesso!');
        },
      });
    });
  }
}
