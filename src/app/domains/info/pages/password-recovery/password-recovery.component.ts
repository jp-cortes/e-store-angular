import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  emailSent = signal(false);
  private router = inject(Router)
  private userService = inject(UserService);
  @Input() email!: string;


  sendRecoveryEmail() {
    const email = this.email;
    if(email) {
      this.userService.sendRecoveryEmail(email)
      .subscribe({
        next: () => {
          this.emailSent.update( prevState => !prevState);
          this.router.navigate(['/sign-in']);
        },
        error: (error) => console.log(error, 'error at userService sendRecoveryEmail()'),
      });
    }
  }
}
