import { ComponentFixture, TestBed } from "@angular/core/testing";
import MyInvoiceComponent from "./my-invoice.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "@shared/services/user.service";
import { generateOrderDetail } from "@shared/models/order.mock";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { of } from "rxjs";
import { SimpleChange } from "@angular/core";





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
    
    component.ngOnChanges({
      invoiceId: new SimpleChange(null, component.invoiceId, false)
    })
    fixture.detectChanges();
    
    expect(component).toBeDefined();
    expect(authTokenService.getToken).toHaveBeenCalled();
    expect(userService.getInvoice).toHaveBeenCalled();
  });


});