import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CpfPipe } from '../../../pipes/cpf.pipe';
import { ClientDetailComponent } from '../client-detail/client-detail.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [DbService, DatePipe, CpfPipe],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  imports: [CommonModule, ButtonComponent, CpfPipe, ClientDetailComponent],
})
export class ClientListComponent implements OnInit, OnDestroy {
  total!: number;
  actualPage!: number;
  limit!: number;

  clients$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  user!: any;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.actualPage = 1;
    this.limit = 5;

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
    this.dbService.getClientsPaginated(this.actualPage).subscribe({
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
