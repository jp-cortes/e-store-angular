import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { UserService } from './user.service';
import { User, UserAccount, UserSignIn } from '@shared/models/user.model';
import { generateSignInUser, generateUserAccount } from '@shared/models/user.mock';


describe('Test for UserService', () => {
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
})

it('should be created', () => {
    expect(userService).toBeTruthy()
});



describe('test for signIn', () => {
  it('should return a user', (doneFn) => {
    //Arrange
    const mockUserData: User = generateSignInUser();
    const dummyUser: UserSignIn = {
      email: 'dummyUser@mail.com',
      password: 'dummyPassword123'
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

describe('test for sendRecoveryEmail', () => {
  it('should return a confirmation message', (doneFn) => {
    //Arrange
    const mockUserData  = { message: 'email sent' };
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
      req.flush(mockUserAccountData);
    });
  })


});

});
