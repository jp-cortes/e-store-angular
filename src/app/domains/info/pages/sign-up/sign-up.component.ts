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

  onInit() { }




  signUp(event: Event) {
    this.newProfileForm.markAllAsTouched()

    const {name, lastName,
      phone, user} = this.newProfileForm.value;
    console.log(name)
    console.log(lastName)
    console.log(phone)
    console.log(user?.email)
    console.log(user?.password)
    console.log(user?.confirm_password)
    console.log(this.newProfileForm.valid)
  }


// getting the inputs
  get nameField() {
    return this.newProfileForm.get('name')
  }
  get lastNameField() {
    return this.newProfileForm.get('lastName')
  }
  get phoneField() {
    return this.newProfileForm.get('phone')
  }
  get emailField() {
    return this.newProfileForm.get('user.email')
  }
  get passwordField() {
    return this.newProfileForm.get('user.password')
  }
  get confirmPasswordField() {
    return this.newProfileForm.get('user.confirm_password')
  }

// validators
  get invalidNameField() {
    return this.nameField?.touched && this.nameField?.invalid
  }
  get invalidLastNameField() {
    return this.lastNameField?.touched && this.lastNameField?.invalid
  }
  get invalidPhoneField() {
    return this.phoneField?.touched && this.phoneField?.invalid
  }
  get invalidEmailField() {
    return this.emailField?.touched && this.emailField?.invalid
  }
  get invalidPasswordField() {
    return this.passwordField?.touched && this.passwordField?.invalid
  }
  get invalidConfirmPasswordField() {
    return this.confirmPasswordField?.touched && this.confirmPasswordField?.invalid
  }

  get passwordMatchValidator() {
    return this.passwordField?.value === this.confirmPasswordField?.value
       ? true : false;
 }


}
