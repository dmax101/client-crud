import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask(), DbService],
})
export class ClientDetailComponent implements OnInit {
  @Input() user!: any;
  @Output() closeDialog = new EventEmitter();
  @Output() saveClient = new EventEmitter();
  registerForm!: FormGroup;

  cpfIsDisabled!: boolean;

  constructor(private fb: FormBuilder, private dbService: DbService) {}

  ngOnInit(): void {
    console.log('user', this.user);

    if (!this.user) {
      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        cpf: ['', [Validators.required, this.validateCpf]],
        birthDate: ['', [Validators.required]],
        monthlyIncome: ['', [Validators.required]],
        email: ['', [Validators.required]],
        createdAt: ['', [Validators.required]],
      });
      this.cpfIsDisabled = false;
    } else {
      this.registerForm = this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        cpf: [this.user.cpf, [Validators.required, this.validateCpf]],
        birthDate: [this.user.birthDate, [Validators.required]],
        monthlyIncome: [this.user.monthlyIncome, [Validators.required]],
        email: [this.user.email, [Validators.required]],
        createdAt: [this.user.createdAt, [Validators.required]],
      });
      this.cpfIsDisabled = true;
    }
  }

  validateCpf(control: any): { [key: string]: any } | null {
    let cpf = control.value;
    if (cpf) {
      let sum = 0;
      let remainder;
      cpf = cpf.replace(/[^\d]/g, '');
      if (cpf === '00000000000') {
        return { cpfNotValid: true };
      }
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return { cpfNotValid: true };
      }
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return { cpfNotValid: true };
      }
    }
    return null;
  }

  ageValidation(birthDate: string) {
    const currentDate = new Date();
    const ageInMilliseconds =
      currentDate.getTime() -
      new Date(this.registerForm.value['birthDate']).getTime();
    const ageInYears = Math.floor(
      ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );

    const age = ageInYears;

    if (age < 18 || age > 60) {
      console.error('Erro: A idade deve estar entre 18 e 60 anos!');

      alert('Erro: A idade deve estar entre 18 e 60 anos!');

      throw new Error('Erro: A idade deve estar entre 18 e 60 anos!');
    }
  }

  onSaveRegister() {
    if (this.user.id) {
      this.ageValidation(this.registerForm.value['birthDate']);

      this.dbService
        .updateClientOnDb(this.user.id, this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log('Registro atualizado com sucesso:', response);

            alert('Registro atualizado com sucesso!');

            this.registerForm.reset();
          },
          error: (error) => {
            console.error('Erro ao atualizar registro:', error);
          },
        });

      return new EventEmitter();
    }

    if (this.registerForm.get('cpf')?.invalid) {
      console.error('Erro! O campo CPF é inválido.');

      alert('Erro! O CPF é inválido!');

      throw new Error('Erro! O CPF é inválido!');
    }

    this.ageValidation(this.registerForm.value['birthDate']);

    this.dbService
      .saveClientOnDb({ ...this.registerForm.value, createdAt: new Date() })
      .subscribe({
        next: (response) => {
          console.log('Registro salvo com sucesso:', response);

          alert('Registro salvo com sucesso!');

          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Erro ao salvar registro:', error);
        },
      });

    return new EventEmitter();
  }
}
