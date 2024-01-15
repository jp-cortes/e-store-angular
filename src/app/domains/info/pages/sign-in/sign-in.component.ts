import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  userService = inject(UserService);
  signIngError = signal<boolean>(false);


  user = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
     ]
     }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^.{8,}$/)
     ]
     }),
  })

  userSignIn(event: Event) {
    this.user.markAllAsTouched();
    const {email, password} = this.user.value;

    if(this.user.valid) {
      this.userService
      .signIn({ email, password })
      .subscribe({
        next: () => {
          this.signIngError();
          this.userService.redirect('/my-account');
        },
        error: (error) => {
          console.log(error, 'error at userService signIn()');
          this.signIngError.update(prevState => !prevState);
        },
      });
    }
  }

  // getting the inputs
  get emailField() {
    return this.user.get('email');
  }
  get passwordField() {
    return this.user.get('password');
  }


  // validators
  get invalidEmailField() {
    return this.emailField?.touched && this.emailField?.invalid;
  }
  get invalidPasswordField() {
    return this.passwordField?.touched && this.passwordField?.invalid;
  }


}
