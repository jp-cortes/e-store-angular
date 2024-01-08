import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userService = inject(UserService);

  signUp() {

  }
}
