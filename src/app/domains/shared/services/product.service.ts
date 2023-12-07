import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { Category } from '@shared/models/category.model.';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts() {

    return this.http.get<Product[]>(`https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1/products`)
  }
  getProductsByCategory(categoryId?: number): Observable<any> {

    if(categoryId) {

     return this.http.get<Category>(`https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1/categories/${categoryId}`)

    }
    return new Observable<any>()
  }

  getOne(id: string) {
    return this.http.get<Product>(`https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1/products/${id}`)
  }


}
