import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  emailSent = signal(false);
  inValidEmail = signal(false);
  private router = inject(Router)
  private userService = inject(UserService);
  @Input() email!: string;



  sendRecoveryEmail() {
    const email = this.email;
    const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const isValid = regex.test(email)

    if(isValid) {
      this.userService.sendRecoveryEmail(email)
      .subscribe({
        next: () => {
          this.emailSent.set(true);
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 8000)
        },
        error: (error) => {
          console.log(error, 'error at userService sendRecoveryEmail()')
          this.inValidEmail.set(true);
        },
      });
    } else {
      this.inValidEmail.set(true);
    }
  }
}
