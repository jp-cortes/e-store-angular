import { CategoryService } from "./category.service";
import { Category } from "@shared/models/category.model";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { generateCategories, generateOneCategory } from "@shared/models/category.mock";

describe('Test for CategoryService', () => {
    let categoryService: CategoryService;
    let httpControler: HttpTestingController;
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ CategoryService ]
    })
    categoryService = TestBed.inject(CategoryService);
    httpControler = TestBed.inject(HttpTestingController);
});


it('should be created', () => {
    expect(categoryService).toBeTruthy()
});
describe('test for getCategories', () => {
    it('should return a list of categories', (doneFn) => {
        //Arrange
        const mockCategoriesData: Category[] = generateCategories();
        // Act
        categoryService.getCategories()
        .subscribe((data) => {
            expect(data.length).toEqual(mockCategoriesData.length);
            expect(data).toEqual(mockCategoriesData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/categories`;
        const req = httpControler.expectOne(url);
        req.flush(mockCategoriesData);
        httpControler.verify();
    });

    it('should return a category', (doneFn) => {
        //Arrange
        const mockCategoryData: Category = generateOneCategory();
        // Act
        categoryService.getCategory('1')
        .subscribe((data) => { 
            expect(data).toBe(mockCategoryData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/categories/1`;
        const req = httpControler.expectOne(url);
        req.flush(mockCategoryData);
        httpControler.verify();
    });
});

})

