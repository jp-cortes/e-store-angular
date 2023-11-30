import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product.model'
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);

  constructor() {
    const initProducts: Product[] = [
      {
        id: crypto.randomUUID(),
        title: 'Product 1',
        img: 'https://picsum.photos/640/640?r=10',
        price: 100,
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Product 2',
        img: 'https://picsum.photos/640/640?r=11',
        price: 100,
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Product 3',
        img: 'https://picsum.photos/640/640?r=12',
        price: 100,
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Product 4',
        img: 'https://picsum.photos/640/640?r=13',
        price: 100,
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Product 5',
        img: 'https://picsum.photos/640/640?r=14',
        price: 100,
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Product 6',
        img: 'https://picsum.photos/640/640?r=15',
        price: 100,
        createdAt: new Date().toISOString()
      },
    ]
    this.products.set(initProducts)
  }

  fromChild(event: string) {
    console.log('This is  father ListComponent');
    console.log(event);
  }


}
