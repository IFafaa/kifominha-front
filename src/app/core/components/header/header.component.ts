import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TokenService } from '../../services/token.service';

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

  constructor(private router: Router, private tokenService: TokenService) {
    this.url = router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
