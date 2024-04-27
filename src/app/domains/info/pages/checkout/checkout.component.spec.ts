import { ComponentFixture, TestBed } from "@angular/core/testing";
import CheckoutComponent from "./checkout.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "@shared/services/user.service";
import { OrderService } from "@shared/services/order.service";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { CartService } from "@shared/services/cart.service";
import { generateCartItems } from "@shared/models/cart.mock";
import { queryAllBySelector, clickElement } from "@testing/index";
import { generateItemAdded, generateOneOrder } from "@shared/models/order.mock";
import { of } from "rxjs";


describe('Test for CheckoutComponent', () => {
    let component: CheckoutComponent;
    let fixture: ComponentFixture<CheckoutComponent>;
    let cartService: jasmine.SpyObj<CartService>;
    let userService: jasmine.SpyObj<UserService>;
    let orderService: jasmine.SpyObj<OrderService>;
    let authTokenService: jasmine.SpyObj<AuthTokenService>;
  
    beforeEach(async () => {
      const cartServiceSpy = jasmine.createSpyObj('CartService', ['items', 'subtotal']);
      const userServiceSpy = jasmine.createSpyObj('UserService', ['redirect']);
      const orderServiseSpy = jasmine.createSpyObj('OrderService', ['createOrder', 'addProduct']);
      const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getToken']);
  
      await TestBed.configureTestingModule({
        imports: [ CheckoutComponent, RouterTestingModule ],
        providers: [
          { provide: CartService, useValue: cartServiceSpy },
          { provide: UserService, useValue: userServiceSpy },
          { provide: OrderService, useValue: orderServiseSpy },
          { provide: AuthTokenService, useValue: authTokenServiceSpy },
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CheckoutComponent);
      cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
      orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
      authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
  
      const productMock = generateCartItems(3);
      const mockSubtotal = 1233;

      component = fixture.componentInstance;
      cartService.items.and.returnValue(productMock);
      cartService.subtotal.and.returnValue(mockSubtotal);
      fixture.detectChanges();
    });

    it('Should create CheckoutComponent', () => {
        expect(component).toBeDefined();
        expect(authTokenService.getToken).toHaveBeenCalled();
        expect(cartService.items).toHaveBeenCalled();
        expect(cartService.subtotal).toHaveBeenCalled();
    });

    describe('Test for UI', () => {
      it('Testing UI should display the name of the products', () => {
        // Arrange
        const productMock = generateCartItems(2)
        cartService.items.and.returnValue(productMock);
        fixture.detectChanges();
        
        // Act        
        const pDeg = queryAllBySelector(fixture, 'p.mb-2');
        const product1:HTMLElement = pDeg[0].nativeElement;
        const product2:HTMLElement = pDeg[1].nativeElement;
        const productMock1 = productMock[0].name;
        const productMock2 = productMock[1].name;
        
        fixture.detectChanges();
        // Assert
        expect(pDeg.length).toEqual(productMock.length);
        expect(product1.textContent).toEqual(productMock1);
        expect(product2.textContent).toEqual(productMock2);
      });

      it('Testing UI should display the image of the products', () => {
        // Arrange
        const productMock = generateCartItems(2)
        cartService.items.and.returnValue(productMock);
        fixture.detectChanges();
        
        // Act        
        const pDeg = queryAllBySelector(fixture, 'img.w-12');
        const product1:HTMLImageElement = pDeg[0].nativeElement;
        const product2:HTMLImageElement = pDeg[1].nativeElement;
        const productMock1 = productMock[0].image;
        const productMock2 = productMock[1].image;
        
        fixture.detectChanges();
        // Assert
        expect(pDeg.length).toEqual(productMock.length);
        expect(product1.src).toEqual(productMock1);
        expect(product2.src).toEqual(productMock2);
      });

      it('Testing UI should display the quantity of the products', () => {
        // Arrange
        const productMock = generateCartItems(2)
        cartService.items.and.returnValue(productMock);
        fixture.detectChanges();
        
        // Act        
        const pDeg = queryAllBySelector(fixture, 'p.font-semibold');
        const product1:HTMLElement = pDeg[0].nativeElement;
        const product2:HTMLElement = pDeg[1].nativeElement;
        const productMock1 = productMock[0].quantity;
        const productMock2 = productMock[1].quantity;
        
        // fixture.detectChanges();

        // Assert
        expect(pDeg.length).toEqual(productMock.length);
        expect(product1.textContent).toEqual(`${productMock1}`);
        expect(product2.textContent).toEqual(`${productMock2}`);
      });

      it('Testing the button Checkout', () => {
        // Arrange
        const orderMock = generateOneOrder();
        const itemAddedMock = generateItemAdded();
        orderService.createOrder.and.returnValue(of(orderMock));
        orderService.addProduct.and.returnValue(of(itemAddedMock));
        
        // Act
        clickElement(fixture, 'btn-checkout', true);
        fixture.detectChanges();

        // Assert        
        expect(orderService.createOrder).toHaveBeenCalled();
        expect(orderService.addProduct).toHaveBeenCalled();
      });
    });
});