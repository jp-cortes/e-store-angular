import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product = signal<Product | null>(null);
  cover = signal('');
  @Input() id?: string;

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  ngOnInit() {
    if(this.id) {
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          if(product.image.length > 0) {
            this.cover.set(product.image)
            // this.cover.set(product.images[0])
          }
        }
      })
    }
  }

  changeImg(newImage: string) {
    this.cover.set(newImage)
  }

  addToCart() {
    const product = this.product();
    if(product) {
      this.cartService.addToCart(product);
    }
  }

}
