import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private url = `https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1`

  constructor() { }

  getProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.url}/products`, { params })
  }

  getProductsByCategory(categoryId?: number): Observable<any> {

    if(categoryId) {

     return this.http.get<Category>(`${this.url}/categories/${categoryId}`)

    }
    return new Observable<any>()
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.url}/products/${id}`)
  }


}
