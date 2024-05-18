import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { UserService } from "@shared/services/user.service"
import { authGuard } from "./auth.guard";

xdescribe('Test for authGuard', () => {
    let userService: jasmine.SpyObj<UserService>;
    let authTokenService: jasmine.SpyObj<AuthTokenService>;
    let router: Router;

    beforeEach(() => {
        const userServiceSpy = jasmine.createSpyObj('UserService', ['redirect']);
        const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getToken']);
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
            { provide: AuthTokenService, useValue: authTokenServiceSpy }
            ]
        });
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    });
    it(' Should return true if token exist', () => {
        userService.redirect.and.callThrough();
        authTokenService.getToken.and.returnValue('token');
        const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
        expect(result).toBe(true);
    });
});