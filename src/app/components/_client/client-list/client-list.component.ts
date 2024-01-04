import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [DbService, DatePipe],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  imports: [CommonModule, ButtonComponent],
})
export class ClientListComponent implements OnInit {
  total!: number;
  clients!: any[];
  sort!: string[];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getClientsPaginated().subscribe({
      next: (res) => {
        console.log('Data retrieved successfully');

        this.total = Number(res.headers.get('X-Total-Count'));

        this.clients = res.body as any[];
      },
    });
  }

  delete(id: number) {
    this.dbService.deleteClientOnDb(id).subscribe({
      next: (res) => {
        alert('Cliente deletado com sucesso!');
      },
      error: (error) => {
        alert('Não foi possível apagar!');
      },
    });
  }
}
