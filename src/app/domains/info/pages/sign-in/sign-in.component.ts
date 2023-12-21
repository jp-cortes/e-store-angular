import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  userService = inject(UserService);
  signingIn = signal<boolean>(false);
  @Input() email!: '';
  @Input() password!: '';

  userSignIn() {
    this.userService
      .signIn({ email: this.email, password: this.password })
      .subscribe({
        next: (data) => {
          console.log(data, 'user login');
        },
        error: (error) => {
          console.log(error, 'error at userService signIn()');
        },
      });
  }
}
