import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { UserAccount } from '@shared/models/user.model';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  user = signal<UserAccount | null>(null)
  userService = inject(UserService);

  ngOnInit() {
    this.getProfileInfo()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // this.getProfileInfo()
  }

  getProfileInfo() {
    this.userService.getMyAccount()
    .subscribe({
      next: (data) => this.user.set(data),
      error: (error) => console.log(error, 'error at userService getMyAccount()'),
    });
  }


}
