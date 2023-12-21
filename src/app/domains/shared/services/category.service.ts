import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://express-rest-api-dev-hacj.2.us-1.fl0.io'
  private http = inject(HttpClient);

  constructor() { }



  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/api/v1/categories`)
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/api/v1/categories/${id}`)
  }
}
