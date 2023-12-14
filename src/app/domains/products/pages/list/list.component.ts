import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model.';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  products = signal<Product[]>([]);// initial array of products
  categories = signal<Category[]>([]);// initial array of categories
  cartService = inject(CartService);// shopping cart
  productService = inject(ProductService);// array of products from the server
  categoryService = inject(CategoryService);// array of categories from the server
  @Input() categoryId?: number;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category_id = changes['categoryId']

    if(category_id.currentValue === undefined) {
      this.getProducts();
    }
    this.getProductsBycategory()


  }

  addToCart(product: Product) {
   this.cartService.addToCart(product);
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe({
  next: (data) => {
    this.products.set(data);
  },
  error: (error) => {
    console.log(error, 'error at product service getProducts')
  }
})
  }

  getProductsBycategory() {
    this.productService.getProductsByCategory(this.categoryId)
      .subscribe({
  next: (data) => {
    if (data && data.products) {
      this.products.set(data.products);
    } else {
      console.log('Data or data.products is undefined');
    }
  },
  error: (error) => {
    console.log(error, 'error at product service getProductsCategory')
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
    console.log(error, 'error at product service getCategories')
  }
})
  }


}
