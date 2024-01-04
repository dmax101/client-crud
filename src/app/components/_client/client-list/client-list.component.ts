import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  clients!: any[];

  constructor(private http: HttpClient) {
    this.getClients();

    console.log(this.clients);
  }

  getClients() {
    this.http.get<any[]>('http://localhost:3000/clients').subscribe((data) => {
      this.clients = data;
    });
  }
}
