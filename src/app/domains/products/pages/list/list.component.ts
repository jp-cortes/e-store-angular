import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);// initial array of products
  cartService = inject(CartService);// shopping cart
  productService = inject(ProductService);// array of products from the server

  ngOnInit() {
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

  addToCart(product: Product) {
   this.cartService.addToCart(product);
  }


}
