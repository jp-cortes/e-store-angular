import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyInvoiceComponent from "./my-invoice.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "@shared/services/user.service";
import { generateOrderDetail } from "@shared/models/order.mock";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { of } from "rxjs";
import { SimpleChange } from "@angular/core";
import { OrderDetail } from "@shared/models/order.model";
import { queryAllBySelector, queryById } from "@testing/finders";





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

describe('Tes for invoice signal', () => {
  let invoiceMock:OrderDetail;

  beforeAll(() => {
    invoiceMock = generateOrderDetail(); 
  });

it('Should display invoice id', () => {
  // Arrange
  component.invoice.set(invoiceMock);
  fixture.detectChanges();

  // Act
  const spanDe = queryById(fixture, 'invoice-id');
  const spanEl: HTMLElement = spanDe.nativeElement;

  fixture.detectChanges();

  // Assert
  expect(spanEl.textContent).toEqual(` ${invoiceMock.id} `);
});

it('Should display invoice Issue date', () => {
  // Arrange
  component.invoice.set(invoiceMock);
  fixture.detectChanges();

  // Act
  const spanDe = queryById(fixture, 'invoice-issue-date');
  const spanEl: HTMLElement = spanDe.nativeElement;

  fixture.detectChanges();

  // Assert
  expect(spanEl.textContent).toEqual(`Issue date: ${invoiceMock.createdAt.slice(0, 10)}`);
});

it('Should display invoice status', () => {
  // Arrange
  component.invoice.set(invoiceMock);
  fixture.detectChanges();

  // Act
  const divDe = queryById(fixture, 'invoice-status');
  const divEl: HTMLElement = divDe.nativeElement;

  fixture.detectChanges();

  // Assert
  expect(divEl.textContent).toEqual(` ${invoiceMock.status} `);
});

it('Should display invoice items', () => {
  // Arrange
  component.invoice.set(invoiceMock);
  fixture.detectChanges();

  // Act
  const divDe = queryAllBySelector(fixture, 'td.item-name');


  fixture.detectChanges();

  // Assert
  expect(divDe.length).toEqual(invoiceMock.items.length);
  expect(component.invoice()?.items).toEqual(invoiceMock.items);
});

});

});
