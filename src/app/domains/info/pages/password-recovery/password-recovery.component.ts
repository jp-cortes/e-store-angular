import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  emailSent = signal(false);
  invalidEmail = signal(false);
  private userService = inject(UserService);
  // @Input() email!: string;

 user = new FormGroup({
   email: new FormControl('', {
     nonNullable: true,
     validators: [
       Validators.required,
       Validators.email,
    ]
   })
 })

  sendRecoveryEmail(event: Event) {
    this.user.markAsTouched();

    const { email } = this.user.value;
    if(this.user.valid) {
      this.userService.sendRecoveryEmail(email)
      .subscribe({
        next: (data) => {
          // console.log(data, 'recovery email')
          this.emailSent.set(true);
          setTimeout(() => {
            this.userService.redirect('/sign-in');
          }, 8000)
        },
        error: (error) => {
          // console.log(error, 'error at userService sendRecoveryEmail()');
          this.invalidEmail.set(true);
        },
      });
    }
  }

  // getting input
  get emailField() {
    return this.user.get('email');
  }

  //validator
  get invalidEmailField() {
    return this.emailField?.touched && this.emailField?.invalid;
  }
}
