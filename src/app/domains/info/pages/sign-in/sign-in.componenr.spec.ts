import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignInComponent } from "./sign-in.component";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";



describe('Test for SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let userService: jasmine.SpyObj<UserService>;
  
    beforeEach(async () => {
      const userServiceSpy = jasmine.createSpyObj('UserService', ['signUp']);
  
      await TestBed.configureTestingModule({
        imports: [ SignInComponent, RouterTestingModule ],
        providers: [
          { provide: UserService, useValue: userServiceSpy },
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SignInComponent);

  
      component = fixture.componentInstance;
  
      fixture.detectChanges();
    });

    it('Should create SignInComponent', () => {
        expect(component).toBeDefined();
    });

    it('Test for emailField, should be invalid', () => {
        component.emailField?.setValue('djnfdslfndlsfn.com');
        expect(component.emailField?.invalid).withContext('Not a valid email').toBeTruthy();
  
        component.emailField?.setValue('');
        expect(component.emailField?.invalid).withContext('empty field').toBeTruthy();
      });
  
      it('Test for passwordField, should be invalid', () => {
        component.passwordField?.setValue('ggjhgjh');
        expect(component.passwordField?.invalid).withContext('Not a valid password').toBeTruthy();
  
        component.passwordField?.setValue('');
        expect(component.passwordField?.invalid).withContext('empty field').toBeTruthy();
      });
});