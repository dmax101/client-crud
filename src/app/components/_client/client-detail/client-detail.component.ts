import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
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
      cpf: ['', [Validators.required]],
      // birthDate: ['', [Validators.required]],
      // monthlyIncome: ['', [Validators.required]],
      // email: ['', [Validators.required]],
      // createdAt: ['', [Validators.required]],
    });
  }

  onSaveRegister() {
    console.log('save!!!!!');
    console.log(this.registerForm.value);

    return new EventEmitter();
  }
}
