import { TestBed } from "@angular/core/testing";
import { AuthTokenService } from "./auth-token.service";
import { faker } from "@faker-js/faker";
import { CookieService } from "ngx-cookie-service";


describe('Test for AuthTokenService', () => {
    let authTokenService: AuthTokenService;
    let cookieService: jasmine.SpyObj<CookieService>;

    
    beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get', 'set', 'deleteAll', 'delete']);
    TestBed.configureTestingModule({
        providers: [ 
            AuthTokenService,
            { provide: CookieService, useValue: cookieServiceSpy },
        ]
    });
    authTokenService = TestBed.inject(AuthTokenService); 
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
   })


    it('should create AuthTokenService', () => {
        expect(authTokenService).toBeTruthy();
    });

    describe('Test for methods', () => {
        it('should call getToken method and return a token', (doneFn) => {
            //Arrange
            const fakeToken = faker.string.alphanumeric();
            cookieService.get.and.returnValue(fakeToken);
            
            authTokenService.getToken();

            expect(cookieService.get).toHaveBeenCalled();
            
            expect(authTokenService.getToken()).toEqual(fakeToken);
            doneFn();
          });

          it('should spy saveToken method', (doneFn) => {
            //Arrange
            cookieService.set.and.callThrough();
            cookieService.deleteAll.and.callThrough();

            const fakeToken = faker.string.alphanumeric();
            authTokenService.saveToken(fakeToken);

            expect(cookieService.set).toHaveBeenCalled();
            expect(cookieService.deleteAll).toHaveBeenCalled();
            doneFn();
          });

          it('should spy deleteToken method', (doneFn) => {
            //Arrange
            cookieService.delete.and.callThrough();

            const fakeToken = faker.string.alphanumeric();
            authTokenService.deleteToken();

            expect(cookieService.delete).toHaveBeenCalled();
            doneFn();
          });
    });

    
})