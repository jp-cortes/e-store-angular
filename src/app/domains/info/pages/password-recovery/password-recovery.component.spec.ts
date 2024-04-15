import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { PasswordRecoveryComponent } from "./password-recovery.component";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { setInputValue } from "@testing/forms";
import { getText } from "@testing/finders";
import { clickElement } from "@testing/click";
import { of } from "rxjs";
import { generateEmailResponse } from "@shared/models/user.mock";

describe('Test for PasswordRecoveryComponent', () => {
    let component: PasswordRecoveryComponent;
    let fixture: ComponentFixture<PasswordRecoveryComponent>;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(async () => {
      const userServiceSpy = jasmine.createSpyObj('UserService', ['sendRecoveryEmail', 'redirect']);

      await TestBed.configureTestingModule({
        imports: [ PasswordRecoveryComponent, RouterTestingModule ],
        providers: [
          { provide: UserService, useValue: userServiceSpy },
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PasswordRecoveryComponent);
      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('Should create PasswordRecoveryComponent', () => {
        expect(component).toBeDefined();
    });

    it('Test for emailField, should be invalid', () => {
        component.emailField?.setValue('djnfdslfndlsfn.com');
        expect(component.emailField?.invalid).withContext('Not a valid email').toBeTruthy();

        component.emailField?.setValue('');
        expect(component.emailField?.invalid).withContext('empty field').toBeTruthy();
      });

      it('Test for emailField UI, should be invalid', () => {

        setInputValue(fixture, 'input#email', 'dsjsndmdksmdk');
        fixture.detectChanges();
        expect(component.emailField?.invalid).withContext('Not an email');

        const textError = getText(fixture, 'invalidEmail-recovery');
        expect(textError).toContain('Invalid email');
      });

      it('Should test the user form should be valid UI demo', fakeAsync(() => {

        setInputValue(fixture, 'input#email', 'jcage@mk.com');


        const EmailResponseMock = generateEmailResponse();

        userService.sendRecoveryEmail.and.returnValue(of(EmailResponseMock));
        // Act
        clickElement(fixture, 'btn-password-recovery', true);
        tick();
        fixture.detectChanges();

        expect(component.user.valid).toBeTruthy();
        expect(userService.sendRecoveryEmail).toHaveBeenCalled(); // sending recovery email


        expect(userService.redirect).toHaveBeenCalled(); // user redirect to sign-in route
      }));
});
