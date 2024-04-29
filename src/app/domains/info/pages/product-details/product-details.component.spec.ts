import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import  ProductDetailsComponent  from './product-details.component';
import { generateOneProduct } from '@shared/models/product.mock';
import { ProductService } from '@shared/services/product.service';
import { of } from 'rxjs';
import { ActivatedRouteStub, getText, queryById } from '@testing/index';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@shared/services/user.service';



describe('Test for ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let route: ActivatedRouteStub;
  let productService: jasmine.SpyObj<ProductService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getOne']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['redirect']);

    await TestBed.configureTestingModule({
      imports: [ ProductDetailsComponent, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as jasmine.SpyObj<ActivatedRouteStub>;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    });

  it('should create ProductDetailsComponent', () => {
    const productMock = generateOneProduct();
    const productMockId = `${productMock.id}`;

    route.setParamMap({ id: productMockId });

    productService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(productService.getOne).toHaveBeenCalledWith(productMockId);
  });


    it('Should display the product image, name & description', () => {
      // Arrange
      const productMock = generateOneProduct();

      const productMockId = `${productMock.id}`;

      route.setParamMap({ id: productMockId });


      productService.getOne.and.returnValue(of(productMock));

      // Act
      fixture.detectChanges();

      const imgDe = queryById(fixture, 'product-img');
      const imgEl: HTMLImageElement = imgDe.nativeElement;
      const h1ElText = getText(fixture, 'product-name');
      const pElText = getText(fixture, 'product-description');

      // Assert
      expect(imgEl.src).toEqual(productMock.image);
      expect(h1ElText).toEqual(` ${productMock.name} `);
      expect(pElText).toEqual(` ${productMock.description} `);

    });


    it('Should redirect users if the is no params in the URL', () => {
      // Arrange
      route.setParamMap({});


      userService.redirect.and.callThrough();

      // Act
      fixture.detectChanges();


      // Assert
     expect(userService.redirect).toHaveBeenCalled();

    });


    it('Should display the button Add To Cart', () => {
      // Arrange
      const buttonDe = queryById(fixture, 'product-btn');
      const buttonEl: HTMLElement = buttonDe.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(buttonEl.textContent).toContain(' Add To Cart ');

    });

  });
