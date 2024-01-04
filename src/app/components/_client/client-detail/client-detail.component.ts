import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  providers: [provideNgxMask()],
})
export class ClientDetailComponent implements OnInit {
  @Output() closeDialog = new EventEmitter();
  @Output() saveClient = new EventEmitter();
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required, this.validateCpf]],
      birthDate: ['', [Validators.required]],
      monthlyIncome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
    });
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

  onSaveRegister() {
    console.log('save!!!!!');
    console.log(this.registerForm.value);
    console.log('form is valid?', !this.registerForm.invalid);

    if (this.registerForm.get('cpf')?.invalid) {
      console.log('O campo CPF é inválido.');

      alert('O CPF é inválido!');

      throw new Error('O CPF é inválido!');
    }

    return new EventEmitter();
  }
}
