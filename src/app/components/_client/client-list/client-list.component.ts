import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CpfPipe } from '../../../pipes/cpf.pipe';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { CeilPipe } from '../../../pipes/ceil.pipe';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [DbService, DatePipe, CpfPipe, CeilPipe],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  imports: [
    CommonModule,
    ButtonComponent,
    CpfPipe,
    ClientDetailComponent,
    CeilPipe,
  ],
})
export class ClientListComponent implements OnInit, OnDestroy {
  total!: number;
  actualPage!: number;
  limit!: number;
  sortedBy!: string;
  sortOrder!: 'asc' | 'desc';

  clients$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  user!: any;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.actualPage = 1;
    this.limit = 5;
    this.sortedBy = 'firstName';
    this.sortOrder = 'asc';

    this.updateData();
  }

  ngOnDestroy(): void {
    this.clients$.unsubscribe();
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

    this.updateData();
  }

  updateData() {
    this.dbService
      .getClientsPaginated(
        this.actualPage,
        this.limit,
        this.sortedBy,
        this.sortOrder
      )
      .subscribe({
        next: (data) => {
          // console.log('Data retrieved successfully', data.body);

          this.clients$.next(data.body!);
          this.total = Number(data.headers.get('X-Total-Count'));
        },
        error: (error) => {
          console.error('Error!', error);
        },
      });
  }

  edit(
    user: any,
    dialogue: HTMLDialogElement,
    clientDetail: ClientDetailComponent
  ) {
    console.log(user);

    this.user = user;
    clientDetail!.user = this.user;
    clientDetail.ngOnInit();
    dialogue.open = true;
  }

  sort(column: string) {
    console.log(column, this.sortedBy);

    if (column == this.sortedBy) {
      this.sortOrder === 'asc'
        ? (this.sortOrder = 'desc')
        : (this.sortOrder = 'asc');
    }

    this.sortedBy = column;

    this.updateData();
  }

  firstPage() {
    this.actualPage === 1
      ? alert('Primeira página alcançada!')
      : (this.actualPage = 1);

    console.log('Página atual', this.actualPage);

    this.updateData();
  }

  nextPage() {
    if (this.actualPage === Math.ceil(this.total / this.limit)) {
      alert('Última página alcançada!');
    } else {
      this.actualPage += 1;
      console.log('Página atual', this.actualPage);

      this.updateData();
    }
  }

  beforePage() {
    if (this.actualPage === 1) {
      alert('Página inicial alcançada!');
    } else {
      this.actualPage -= 1;
      console.log('Página atual', this.actualPage);

      this.updateData();
    }
  }

  lastPage() {
    this.actualPage === Math.ceil(this.total / this.limit)
      ? alert('Última página alcançada!')
      : (this.actualPage = Math.ceil(this.total / this.limit));

    console.log('Página atual', this.actualPage);

    this.updateData();
  }
}
