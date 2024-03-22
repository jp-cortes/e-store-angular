import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import  ProductDetailsComponent  from './product-details.component';
import { generateOneProduct } from '@shared/models/product.mock';
import { ProductService } from '@shared/services/product.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Product } from '@shared/models/product.model';



describe('Test for ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getOne'])
    await TestBed.configureTestingModule({
      imports: [ ProductDetailsComponent, RouterTestingModule ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    const productMock = generateOneProduct();

    productService.getOne.and.returnValue(of(productMock));

    component = fixture.componentInstance;
    component.id = `${productMock.id}`;
    fixture.detectChanges();
  });

  it('should create ProductDetailsComponent', () => {
    expect(component).toBeDefined();
    expect(productService.getOne).toHaveBeenCalled();
  });

  describe('Test for the signal product', () => {
    let productMock: Product;

    beforeAll(() => {
      productMock =  generateOneProduct();
    });
    
    it('Should display the product image', () => {
      // Arrange
      component.product.set(productMock);
      const imgDe: DebugElement = fixture.debugElement.query(By.css('div > img'));
      const imgEl: HTMLImageElement = imgDe.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(imgEl.src).toEqual(component.cover());
  
    });    

    it('Should display the product name', () => {
      // Arrange
      component.product.set(productMock);
      const h1De: DebugElement = fixture.debugElement.query(By.css('div > h1'));
      const h1El: HTMLElement = h1De.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(h1El.textContent).toEqual(` ${productMock.name} `);
  
    });

    it('Should display the product description', () => {
      // Arrange
      component.product.set(productMock);
      const pDe: DebugElement = fixture.debugElement.query(By.css('div > p.leading-relaxed'));
      const pEl: HTMLElement = pDe.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(pEl.textContent).toEqual(` ${productMock.description} `);
  
    });

    it('Should display the button Add To Cart', () => {
      // Arrange
      const buttonDe: DebugElement = fixture.debugElement.query(By.css('div > button.flex'));
      const buttonEl: HTMLElement = buttonDe.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(buttonEl.textContent).toContain(' Add To Cart ');
  
    });

  });

});