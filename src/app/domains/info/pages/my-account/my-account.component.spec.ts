import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyAccountComponent from "./my-account.component";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { generateUserAccount } from "@shared/models/user.mock";
import { generateOrders } from "@shared/models/order.mock";
import { UserAccount } from "@shared/models/user.model";
import { getText, queryAllBySelector, queryById } from "@testing/finders";
import { OrderResume } from "@shared/models/order.model";




describe('Test for MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getMyAccount', 'getMyOrders']);

    await TestBed.configureTestingModule({
      imports: [ MyAccountComponent, RouterTestingModule ],
      providers: [
        AuthTokenService,
        { provide: UserService, useValue: userServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

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


  describe('Test for user signal', () => {
    let userMock:UserAccount;
    beforeAll(() => {
        userMock = generateUserAccount();
    });

    it('Should display user name', () => {
        // arrange
        component.user.set(userMock);
        fixture.detectChanges();
        // Act
        const h2De = getText(fixture, 'customer-name');

        fixture.detectChanges();
        // Assert
        expect(h2De).toEqual(`Hi, ${userMock.customer.name} `)
    });

    it('Should display customer avatar', () => {
        // arrange
        component.user.set(userMock);
        fixture.detectChanges();
        // Act
        const imgDe = queryById(fixture, 'user-img');
        const imgEl: HTMLImageElement = imgDe.nativeElement;

        fixture.detectChanges();
        //Assert
        expect(imgEl.src).toEqual(`${userMock.customer.avatar}`)
    });

    it('Should display customer user name', () => {
        // arrange
        component.user.set(userMock);
        fixture.detectChanges();
        // Act 
        const pDe = getText(fixture, 'user-name');

        fixture.detectChanges();
        // Assert
        expect(pDe).toEqual(`Name:  ${userMock.customer.name} `)
    });


    it('Should display customer user last name', () => {
        // arrange
        component.user.set(userMock);
        fixture.detectChanges();
        // Act
        const pDe = getText(fixture, 'user-lastname');

        fixture.detectChanges();
        // Assert
        expect(pDe).toEqual(`Lastname:  ${userMock.customer.lastName} `)
    });

    it('Should display customer user phone number', () => {
        // arrange
        component.user.set(userMock);
        fixture.detectChanges();
        
        // Act
        const pDe = getText(fixture, 'user-phonenumber');
        
        fixture.detectChanges();
        
        //Assert
        expect(pDe).toEqual(`Phone number:  ${userMock.customer.phone} `)
    });

    describe('Test for orders signal', () => {
        let ordersMock: OrderResume[];

        beforeAll(() => {
            ordersMock = generateOrders();
        });

        it('Should display orders', () => {
            // Arrange
            component.orders.set(ordersMock);
            fixture.detectChanges();
            // Act
            const orders = queryAllBySelector(fixture, 'p.test-order');

            fixture.detectChanges();

            expect(orders.length).toEqual(ordersMock.length);
        });

        it('Should display order status', () => {
            // Arrange
            component.orders.set(ordersMock);
            fixture.detectChanges();
            // Act
            const orders = queryAllBySelector(fixture, 'p.test-order-status');
            const ordersDe = orders[0].nativeElement; 

            fixture.detectChanges();

            expect(ordersDe.textContent).toEqual(` Current status:  ${ordersMock[0].status} `);
        });
    });


  });

});