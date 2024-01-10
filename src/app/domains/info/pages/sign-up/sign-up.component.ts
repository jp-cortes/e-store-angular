import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private userService = inject(UserService);

  newProfileForm = new FormGroup({
    name: new FormControl('',{
     nonNullable: true,
     validators: [
       Validators.required,
       Validators.pattern(/[a-zA-Z ]*/),
    ]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        // regex for lastName
        Validators.pattern(/^[a-zA-Z\u00C0-\u017F' \-]+$/),
     ]
     }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
     ]
     }),
    user: new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          // regex for email
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
       ]
       }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          // regex for password
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\[\]\/]).{8,}$/),
       ]
       }),
      confirm_password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          // regex for password
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\[\]\/]).{8,}$/),
       ]
       }),
    }),
  },);

  onInit() {

  }

  passwordMatchValidator() {
    return this.newProfileForm.value.user?.password === this.newProfileForm.value.user?.confirm_password
       ? true : null;
 }


  signUp() {
    console.log(this.newProfileForm.value.name)
    console.log(this.newProfileForm.value.lastName)
    console.log(this.newProfileForm.value.phone)
    console.log(this.newProfileForm.value.user?.email)
    console.log(this.newProfileForm.value.user?.password)
    console.log(this.newProfileForm.value.user?.confirm_password)
    console.log(this.newProfileForm.valid)
  }
}
