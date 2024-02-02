import { ProductService } from "./product.service";
import { Product } from "@shared/models/product.model";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { generateOneProduct, generateProducts } from "@shared/models/product.mock";

describe('Test for ProductService', () => {
    let productService: ProductService;
    let httpControler: HttpTestingController;
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ ProductService ]
    })
    productService = TestBed.inject(ProductService);
    httpControler = TestBed.inject(HttpTestingController);
});


it('should be created', () => {
    expect(productService).toBeTruthy()
});
describe('test for getProducts', () => {
    it('should return a list of products', (doneFn) => {
        //Arrange
        const mockProductsData: Product[] = generateProducts();
        // Act
        productService.getProducts()
        .subscribe((data) => {
            expect(data.length).toEqual(mockProductsData.length);
            expect(data).toEqual(mockProductsData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products`;
        const req = httpControler.expectOne(url);
        req.flush(mockProductsData);
        httpControler.verify();
    });

    it('should return a product', (doneFn) => {
        //Arrange
        const mockProductData: Product = generateOneProduct();
        // Act
        productService.getOne('1')
        .subscribe((data) => { 
            expect(data).toBe(mockProductData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/1`;
        const req = httpControler.expectOne(url);
        req.flush(mockProductData);
        httpControler.verify();
    });

    it('should return a list of products by category', (doneFn) => {
        //Arrange
        const mockData: Product = generateOneProduct();
        // Act
        productService.getProductsByCategory(1)
        .subscribe((data) => { 
            expect(data).toBe(mockData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/categories/1`;
        const req = httpControler.expectOne(url);
        req.flush(mockData);
        httpControler.verify();
    });
});

})

