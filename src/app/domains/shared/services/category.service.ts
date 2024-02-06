import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.API_URL
  private http = inject(HttpClient);

  constructor() { }



  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`)
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`)
  }
}
