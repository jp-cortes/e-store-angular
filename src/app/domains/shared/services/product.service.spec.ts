import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { Product } from "@shared/models/product.model";
import { ProductService } from "./product.service";
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

afterEach(() => {
    httpControler.verify();
})

it('should be created', () => {
    expect(productService).toBeTruthy()
});

describe('test for getProducts', () => {
  it('should return a list of products', (doneFn) => {
    //Arrange
    const mockProductsData: Product[] = generateProducts();

    // Act
    productService.getProducts().subscribe((data) => {
      expect(data.length).toEqual(mockProductsData.length);
      expect(data).toEqual(mockProductsData);
      doneFn();
    });

    //http config
    const url = `${environment.API_URL}/products`;
    const req = httpControler.expectOne(url);
    req.flush(mockProductsData);
  });

  it('should send a query with limit 10 & offset 10', (doneFn) => {
    //Arrange
    const mockProductsData: Product[] = generateProducts();
    const limit = 10;
    const offset = 10;
    // Act
    productService.getProducts(limit, offset).subscribe((data) => {
      expect(data.length).toEqual(mockProductsData.length);
      expect(data).toEqual(mockProductsData);
      doneFn();
    });

    //http config
    const url = `${environment.API_URL}/products?limit=${limit}&offset=${offset}`;
    const req = httpControler.expectOne(url);
    req.flush(mockProductsData);
    const param = req.request.params;
    expect(param.get('limit')).toEqual(`${limit}`);
    expect(param.get('offset')).toEqual(`${offset}`);
  });

});

  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      //Arrange
      const mockProductData: Product = generateOneProduct();
      const productId = '1';
      // Act
      productService.getOne(productId).subscribe((data) => {
        expect(data).toBe(mockProductData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockProductData);
    });

    //test for the error
    it('should return a the right msg when the status code is 404', (doneFn) => {
      //Arrange
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      const productId = '1';
      // Act
      productService.getOne(productId).subscribe({
        error: (error) => {
          // Assert
        expect(error).toEqual("The product doesn't exist");
        doneFn();
      }});

      //http config
      const url = `${environment.API_URL}/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });
  });

  describe('test for getProductsByCategory', () => {
    it('should return a list of products by category', (doneFn) => {
      //Arrange
      const mockData: Product = generateOneProduct();
      // Act
      productService.getProductsByCategory(1).subscribe((data) => {
        expect(data).toBe(mockData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/categories/1`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
    });
  });
});

