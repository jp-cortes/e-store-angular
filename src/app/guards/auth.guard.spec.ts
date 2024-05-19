import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { UserService } from "@shared/services/user.service"
import { authGuard } from "./auth.guard";

describe('Test for authGuard', () => {
    let userService: jasmine.SpyObj<UserService>;
    let authTokenService: jasmine.SpyObj<AuthTokenService>;
    let router: Router;

    const createAuthGuard = () => { 
        return TestBed.runInInjectionContext(() => authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    }

    beforeEach(() => {
        const userServiceSpy = jasmine.createSpyObj('UserService', ['redirect']);
        const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getToken']);
        const routerSpy = jasmine.createSpy('navigate');

        TestBed.configureTestingModule({
            imports: [ RouterTestingModule],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: AuthTokenService, useValue: authTokenServiceSpy },
                { provide: Router, useValue: routerSpy},
            ]
        });
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    });

    it(' Should return true if token exist', () => {

        const fakeToken = 'bdhba03mv9v90n'

        authTokenService.getToken.and.returnValue(fakeToken);
        
        const result = createAuthGuard();

        expect(authTokenService.getToken).toHaveBeenCalled();
        expect(result).toBeTrue();
    });

    it("Should return false and redirect if token doesn't exist", () => {

        authTokenService.getToken.and.returnValue('');
        userService.redirect.and.callThrough();
        
        const result = createAuthGuard();

        expect(result).toBeFalse();
        expect(authTokenService.getToken).toHaveBeenCalled();
        expect(userService.redirect).toHaveBeenCalledWith('/sign-in');
    });
});