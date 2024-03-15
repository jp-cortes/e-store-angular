import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import  ProductDetailsComponent  from './product-details.component';
import { generateOneProduct } from '@shared/models/product.mock';
import { ProductService } from '@shared/services/product.service';
import { of } from 'rxjs';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });



});