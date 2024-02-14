import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { UserService } from './user.service';
import { User, UserAccount, UserSignIn } from '@shared/models/user.model';
import { generateCustomer, generateSignInUser, generateSignUpCustomer, generateUserAccount } from '@shared/models/user.mock';
import { OrderDetail, OrderResume } from '@shared/models/order.model';
import { generateOrderDetail, generateOrders } from '@shared/models/order.mock';


fdescribe('Test for UserService', () => {
  let userService: UserService;
  let httpControler: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControler.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('test for signIn', () => {
    it('should return a user', (doneFn) => {
      //Arrange
      const mockUserData: User = generateSignInUser();
      const dummyUser: UserSignIn = {
        email: 'dummyUser@mail.com',
        password: 'dummyPassword123',
      };

      // Act
      userService.signIn(dummyUser).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockUserData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/auth/login`;
      const req = httpControler.expectOne(url);
      expect(req.request.body).toEqual(dummyUser);
      expect(req.request.method).toEqual('POST');
      req.flush(mockUserData);
    });
  });

  describe('test for signUp', () => {
    it('should return a customer', (doneFn) => {
      //Arrange
      const mockCustomerData = generateCustomer();
      const dummyCustomer = generateSignUpCustomer(); 

      // Act
      userService.signUp(dummyCustomer).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockCustomerData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/customers`;
      const req = httpControler.expectOne(url);
      expect(req.request.body).toEqual(dummyCustomer);
      expect(req.request.method).toEqual('POST');
      req.flush(mockCustomerData);
    });
  });

  describe('test for sendRecoveryEmail', () => {
    it('should return a confirmation message', (doneFn) => {
      //Arrange
      const mockUserData = { message: 'email sent' };
      const dummyUser = 'dummyUser@mail.com';

      // Act
      userService.sendRecoveryEmail(dummyUser).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockUserData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/auth/recovery`;
      const req = httpControler.expectOne(url);
      expect(req.request.body).toEqual({ email: dummyUser });
      expect(req.request.method).toEqual('POST');
      req.flush(mockUserData);
    });

    //test for the error
    it('should return a the right msg when the status code is 503', (doneFn) => {
      //Arrange
      const msgError = '503 message';
      const mockError = {
        status: HttpStatusCode.ServiceUnavailable,
        statusText: msgError,
      };
      const dummyUser = 'dummyUser@mail.com';
      // Act
      userService.sendRecoveryEmail(dummyUser).subscribe({
        error: (error) => {
          // Assert
        expect(error).toEqual("The email doesn't exist");
        doneFn();
      }});

      //http config
      const url = `${environment.API_URL}/auth/recovery`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(msgError, mockError);
    });

  });

  describe('Test for getMyAccount', () => {
    it('should return a user account', (doneFn) => {
      //Arrange
      const mockUserAccountData: UserAccount = generateUserAccount();

      // Act
      userService.getMyAccount().subscribe((data) => {
        expect(data).toEqual(mockUserAccountData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/users/account`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockUserAccountData);
    });
  });

  describe('Test for getMyOrders', () => {
    it('should return an array of orders', (doneFn) => {
      //Arrange
      const mockOrdersData: OrderResume[] = generateOrders();

      // Act
      userService.getMyOrders().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockOrdersData.length);
        expect(data).toEqual(mockOrdersData);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/profile/my-orders`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockOrdersData);
    });
  });

  describe('Test for getInvoice', () => {
    it('should return an array of orders', (doneFn) => {
      //Arrange
      const mockOrderDetail: OrderDetail = generateOrderDetail();
      const invoiceId = 1;
      // Act
      userService.getInvoice(invoiceId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockOrderDetail);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/orders/${invoiceId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockOrderDetail);
    });
  });

});