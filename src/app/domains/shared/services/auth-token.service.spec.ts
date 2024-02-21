import { TestBed } from "@angular/core/testing";
import { AuthTokenService } from "./auth-token.service";


describe('Test for AuthTokenService', () => {
    let authTokenService: AuthTokenService;

    
    beforeEach(() => {
    // const spy = jasmine.createSpyObj('AuthTokenService', ['saveToken'])
    
    TestBed.configureTestingModule({
        providers: [ 
            // { provide: AuthTokenService, useValue: spy } 
            AuthTokenService
        ]
    });
    authTokenService = TestBed.inject(AuthTokenService);
   })


    it('should create AuthTokenService', () => {
        expect(authTokenService).toBeTruthy();
    });

    describe('Test for getToken', () => {
        it('should call AuthTokenService getToken', (doneFn) => {
            //Arrange
            // spyOn(authTokenService, 'getToken').and.returnValue('');
            expect(authTokenService.getToken()).toBe('');
            doneFn();
          });
    });

    // describe('Test for saveToken', () => {
    //     it('should call AuthTokenService saveToken', (doneFn) => {
    //         //Arrange
    //         spyOn(authTokenService, 'saveToken').and.callThrough();
    //         // expect(authTokenService.saveToken())
    //         expect(authTokenService.saveToken).toHaveBeenCalled();
    //         doneFn();
    //       });
    // });
})