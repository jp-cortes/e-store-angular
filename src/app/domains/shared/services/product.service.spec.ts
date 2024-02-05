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

    it('should send a query with limit 0 & offset 0', (doneFn) => {
        //Arrange
        const mockProductsData: Product[] = generateProducts();
        const limit = 0
        const offset = 0
        // Act
        productService.getProducts(limit, offset)
        .subscribe((data) => {
            expect(data.length).toEqual(mockProductsData.length);
            expect(data).toEqual(mockProductsData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products`;
        const req = httpControler.expectOne(url);
        req.flush(mockProductsData);
        const param = req.request.params;
        expect(param.get('limit')).toBeNull()
        expect(param.get('offset')).toBeNull()
        httpControler.verify();
    });

    it('should send a query with limit 10 & offset 10', (doneFn) => {
        //Arrange
        const mockProductsData: Product[] = generateProducts();
        const limit = 10
        const offset = 10
        // Act
        productService.getProducts(limit, offset)
        .subscribe((data) => {
            expect(data.length).toEqual(mockProductsData.length);
            expect(data).toEqual(mockProductsData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset${offset}`;
        const req = httpControler.expectOne(url);
        req.flush(mockProductsData);
        const param = req.request.params;
        expect(param.get('limit')).toEqual(limit.toString())
        expect(param.get('offset')).toEqual(offset.toString())
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

