import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  userService = inject(UserService);


  resetPassword = new FormGroup({
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
  })

  changePassword(event: Event) {
    this.resetPassword.markAllAsTouched();


const {password} = this.resetPassword.value;
if(this.resetPassword.valid) {
  // this.userService.updatePassword(password)
  this.userService.redirect('/login');
}
  }

  get passwordField() {
    return this.resetPassword.get('password');
  }
  get confirmPasswordField() {
    return this.resetPassword.get('confirm_password');
  }

  get invalidPasswordField() {
    return this.passwordField?.touched && this.passwordField?.invalid;
  }
  get invalidConfirmPasswordField() {
    return this.confirmPasswordField?.touched && this.confirmPasswordField?.invalid;
  }

  get passwordMatchValidator() {
    return this.passwordField?.value === this.confirmPasswordField?.value
       ? true : false;
 }

}
