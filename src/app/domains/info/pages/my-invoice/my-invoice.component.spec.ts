import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyInvoiceComponent from "./my-invoice.component";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { UserService } from "@shared/services/user.service";
import { generateOrderDetail } from "@shared/models/order.mock";
import { AuthTokenService } from "@shared/services/auth-token.service";





describe('Test for MyInvoiceComponent', () => {
let component: MyInvoiceComponent;
  let fixture: ComponentFixture<MyInvoiceComponent>;
  let authTokenService: jasmine.SpyObj<AuthTokenService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const authTokenServiceSpy = jasmine.createSpyObj('UserService', ['getToken']);
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
    const fakeToken = '@!903Dm'

    // authTokenService.getToken.and.returnValue(of(fakeToken))
    // userService.getInvoice.and.returnValue(of(orderMock));

    component = fixture.componentInstance;
    component.invoiceId = orderMock.id;
    fixture.detectChanges();
  });

  it('should create MyInvoiceComponent', () => {
    expect(component).toBeDefined();
    // expect(authTokenService.getToken).toHaveBeenCalled();
    // expect(userService.getInvoice).toHaveBeenCalled();
  });
});