import { Component } from '@angular/core';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ClientListComponent } from '../client-list/client-list.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  imports: [ClientDetailComponent, ClientListComponent, ButtonComponent],
})
export class ClientComponent {}
