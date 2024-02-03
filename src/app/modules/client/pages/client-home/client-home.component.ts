import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { IClient } from 'src/app/core/services/interfaces/client.interface';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent {
  client = this.userService.tokenDecoded<IClient>();
  constructor(private readonly userService: UserService) {}
}
