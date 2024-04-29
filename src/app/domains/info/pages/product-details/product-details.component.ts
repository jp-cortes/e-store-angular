import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export default class ProductDetailsComponent {

  product = signal<Product | null>(null);
  cover = signal('');

  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private userService = inject(UserService);

  ngOnInit() {
    this.route.paramMap
    .subscribe((params) => {
      //get id from URL param
      const productId = params.get('id');
      if(productId) {
        this.productService.getOne(productId)
        .subscribe({
          next: (product) => {
            this.product.set(product);
            if(product.image.length > 0) {
              this.cover.set(product.image)
              // this.cover.set(product.images[0])
            }
          }
        });
      } else {
        this.userService.redirect('/');
      }
    });
  }

  changeImg(newImage: string) {
    this.cover.set(newImage)
  }

  addToCart() {
    const product = this.product();
    if(product) {
      return this.cartService.addToCart(product);
    }
  }

}
