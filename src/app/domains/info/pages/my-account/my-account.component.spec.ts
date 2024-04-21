import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyAccountComponent from "./my-account.component";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { generateUserAccount } from "@shared/models/user.mock";
import { generateOrders } from "@shared/models/order.mock";
import { getText, queryAllBySelector, queryById } from "@testing/finders";
import { clickElement } from "@testing/click";




describe('Test for MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authTokenService: jasmine.SpyObj<AuthTokenService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getMyAccount', 'getMyOrders']);
    const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['deleteToken']);

    await TestBed.configureTestingModule({
      imports: [ MyAccountComponent, RouterTestingModule ],
      providers: [
        { provide: AuthTokenService, useValue: authTokenServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;

    const myAccountMock = generateUserAccount();
    const myOrdersMock = generateOrders(3);
    
    userService.getMyAccount.and.returnValue(of(myAccountMock));
    userService.getMyOrders.and.returnValue(of(myOrdersMock));

    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create MyAccountComponent', () => {
    
    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(userService.getMyAccount).toHaveBeenCalled();
    expect(userService.getMyOrders).toHaveBeenCalled();
  });


  describe('Test for user Account UI', () => {


    it('Should display user name', () => {
        // arrange
        const myAccountMock = generateUserAccount();
        userService.getMyAccount.and.returnValue(of(myAccountMock));

        component.getProfileInfo();
        fixture.detectChanges();
        // Act
        const h2De = getText(fixture, 'customer-name');

        // Assert
        expect(h2De).toEqual(`Hi, ${myAccountMock.customer.name} `)
    });

    it('Should display customer avatar', () => {
        // arrange
        const myAccountMock = generateUserAccount();
        userService.getMyAccount.and.returnValue(of(myAccountMock));

        component.getProfileInfo();
        fixture.detectChanges();
        // Act
        const imgDe = queryById(fixture, 'user-img');
        const imgEl: HTMLImageElement = imgDe.nativeElement;

        //Assert
        expect(imgEl.src).toEqual(`${myAccountMock.customer.avatar}`)
    });

    it('Should display customer user name', () => {
        // arrange
        const myAccountMock = generateUserAccount();
        userService.getMyAccount.and.returnValue(of(myAccountMock));

        component.getProfileInfo();
        fixture.detectChanges();
        // Act 
        const pDe = getText(fixture, 'user-name');

        // Assert
        expect(pDe).toEqual(`Name:  ${myAccountMock.customer.name} `)
    });


    it('Should display customer user last name', () => {
        // arrange
        const myAccountMock = generateUserAccount();
        userService.getMyAccount.and.returnValue(of(myAccountMock));

        component.getProfileInfo();
        fixture.detectChanges();
        // Act
        const pDe = getText(fixture, 'user-lastname');

        // Assert
        expect(pDe).toEqual(`Lastname:  ${myAccountMock.customer.lastName} `)
    });

    it('Should display customer user phone number', () => {
        // arrange
        const myAccountMock = generateUserAccount();
        userService.getMyAccount.and.returnValue(of(myAccountMock));

        component.getProfileInfo();
        fixture.detectChanges();
        
        // Act
        const pDe = getText(fixture, 'user-phonenumber');
        
        
        //Assert
        expect(pDe).toEqual(`Phone number:  ${myAccountMock.customer.phone} `);

      });
      
      it('test sign out button', () => {

        authTokenService.deleteToken.and.callThrough();
       
        clickElement(fixture, 'btn-sign-out', true);
        fixture.detectChanges();

        expect(authTokenService.deleteToken).toHaveBeenCalled();
      });
  });

  describe('Test for orders UI', () => {


    it('Should display orders', () => {
        // Arrange
        const myOrdersMock = generateOrders(3);
        userService.getMyOrders.and.returnValue(of(myOrdersMock));
        
        component.getProfileOrders();

        fixture.detectChanges();
        // Act
        const orders = queryAllBySelector(fixture, 'p.test-order');


        expect(orders.length).toEqual(myOrdersMock.length);
    });

    it('Should display order status', () => {
        // Arrange
        const myOrdersMock = generateOrders(2);
        userService.getMyOrders.and.returnValue(of(myOrdersMock));

        component.getProfileOrders();

        fixture.detectChanges();
        // Act
        const orders = queryAllBySelector(fixture, 'p.test-order-status');
        const ordersDe = orders[0].nativeElement; 


        expect(ordersDe.textContent).toEqual(` Current status:  ${myOrdersMock[0].status} `);
    });
});


});