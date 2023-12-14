import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuMobileComponent } from '../side-menu-mobile/side-menu-mobile.component';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [CommonModule, SideMenuMobileComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.css'
})
export class MenuMobileComponent {
  showSideMenu = signal(false);
@Input() showMenu = false
  toggleSideMenu() {
    this.showSideMenu.update(prevState => !prevState)
  }

}
