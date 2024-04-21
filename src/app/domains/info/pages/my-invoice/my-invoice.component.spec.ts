import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyInvoiceComponent from "./my-invoice.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "@shared/services/user.service";
import { generateOrderDetail } from "@shared/models/order.mock";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { of } from "rxjs";
import { SimpleChange } from "@angular/core";
import { getText, queryAllBySelector } from "@testing/finders";



describe('Test for MyInvoiceComponent', () => {
let component: MyInvoiceComponent;
  let fixture: ComponentFixture<MyInvoiceComponent>;
  let authTokenService: jasmine.SpyObj<AuthTokenService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getToken']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getInvoice', 'redirect']);

    await TestBed.configureTestingModule({
      imports: [ MyInvoiceComponent, RouterTestingModule ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthTokenService, useValue: authTokenServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInvoiceComponent);
    authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    const orderMock = generateOrderDetail();
    const fakeToken = 'abE903Dm';

    authTokenService.getToken.and.returnValue(fakeToken);
    userService.getInvoice.and.returnValue(of(orderMock));

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create MyInvoiceComponent', () => {
    // Arrange
    const invoiceId = component.invoiceId = 1
    // Act
    component.ngOnChanges({
      invoiceId: new SimpleChange(null, invoiceId, false)
    })
    fixture.detectChanges();
    // Assert
    expect(component).toBeDefined();
    expect(authTokenService.getToken).toHaveBeenCalled();
    expect(userService.getInvoice).toHaveBeenCalled();
  });

describe('Test for invoice UI', () => {
  
it('Should display invoice id', () => {
  // Arrange
  const orderMock = generateOrderDetail();
  userService.getInvoice.and.returnValue(of(orderMock));  
  
  component.getInvoice();
  
  fixture.detectChanges();
  // Act
  const spanDe = getText(fixture, 'invoice-id');

  // Assert
  expect(spanDe).toEqual(` ${orderMock.id} `);
});

it('Should display invoice Issue date', () => {
  // Arrange
  const orderMock = generateOrderDetail();
  userService.getInvoice.and.returnValue(of(orderMock));  
  
  component.getInvoice();
  
  fixture.detectChanges();

  // Act
  const spanDe = getText(fixture, 'invoice-issue-date');

    // Assert
  expect(spanDe).toEqual(`Issue date: ${orderMock.createdAt.slice(0, 10)}`);
});

it('Should display invoice status', () => {
  // Arrange
  const orderMock = generateOrderDetail();
  userService.getInvoice.and.returnValue(of(orderMock));  
  
  component.getInvoice();
  
  fixture.detectChanges();
  // Act
  const divDe = getText(fixture, 'invoice-status');


  // Assert
  expect(divDe).toEqual(` ${orderMock.status} `);
});

it('Should display invoice items', () => {
  // Arrange
  const orderMock = generateOrderDetail();
  userService.getInvoice.and.returnValue(of(orderMock));  
  
  component.getInvoice();
  
  fixture.detectChanges();

  // Act
  const divDe = queryAllBySelector(fixture, 'td.item-name');


  // Assert
  expect(divDe.length).toEqual(orderMock.items.length);
  expect(component.invoice()?.items).toEqual(orderMock.items);
});

});

});
