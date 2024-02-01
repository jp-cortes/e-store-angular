import { CategoryService } from "./category.service";
import { Category } from "@shared/models/category.model";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";

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
    it('should return a category list', (doneFn) => {
        //Arrange
        const mockData: Category[] = [
            {
                id: 1,
                name: 'category 1',
                image: 'img',
                createdAt:'01/01/2024'
            }
        ];
        // Act
        categoryService.getCategories()
        .subscribe((data) => {
            expect(data.length).toEqual(mockData.length);
            expect(data).toEqual(mockData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/categories`;
        const req = httpControler.expectOne(url);
        req.flush(mockData);
        httpControler.verify();
    });
});

})

