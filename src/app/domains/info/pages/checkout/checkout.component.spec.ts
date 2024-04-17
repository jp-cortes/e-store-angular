import { ComponentFixture, TestBed } from "@angular/core/testing";
import CheckoutComponent from "./checkout.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "@shared/services/user.service";
import { OrderService } from "@shared/services/order.service";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { CartService } from "@shared/services/cart.service";
import { generateCartItems } from "@shared/models/cart.mock";
import { of } from "rxjs";
import { CartItemType } from "@shared/models/cart.model";
import { computed } from "@angular/core";

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
  
      const productMock = generateCartItems(3)

      component = fixture.componentInstance;
      component.cart = computed(() => productMock)
      fixture.detectChanges();
    });

    it('Should create CheckoutComponent', () => {
        expect(component).toBeDefined();
    });
});