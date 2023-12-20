import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }



  getCategories() {
    return this.http.get<Category[]>(`https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1/categories`)
  }

  getCategory(id: string) {
    return this.http.get<Category>(`https://express-rest-api-dev-hacj.2.us-1.fl0.io/api/v1/categories/${id}`)
  }
}
