import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu-mobile.component.html',
  styleUrl: './side-menu-mobile.component.css'
})
export class SideMenuMobileComponent {
  @Input() showMenu = true // not working
}
