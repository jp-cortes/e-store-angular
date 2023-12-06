import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model.';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);// initial array of products
  categories = signal<Category[]>([]);// initial array of categories
  cartService = inject(CartService);// shopping cart
  productService = inject(ProductService);// array of products from the server
  categoryService = inject(CategoryService);// array of categories from the server

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  addToCart(product: Product) {
   this.cartService.addToCart(product);
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe({
  next: (products) => {
    this.products.set(products);
  },
  error: (error) => {
    console.log(error, 'error at product service')
  }
})
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe({
  next: (data) => {
    this.categories.set(data);
  },
  error: (error) => {
    console.log(error, 'error at product service')
  }
})
  }


}
