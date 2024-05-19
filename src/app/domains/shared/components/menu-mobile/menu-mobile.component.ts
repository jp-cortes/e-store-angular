import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './menu-mobile.component.html',
})
export class MenuMobileComponent {
  showSideMenu = signal(true);
  categories = signal<Category[]>([]);// initial array of categories
  categoryService = inject(CategoryService);// array of categories from the server



  toggleSideMenu() {
    this.showSideMenu.update(prevState => !prevState)
  }


  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getCategories()
      .subscribe({
  next: (data) => {
    this.categories.set(data);
  },
  error: (error) => {
    console.log(error, 'error at product service getCategories')
  }
})
  }
}
