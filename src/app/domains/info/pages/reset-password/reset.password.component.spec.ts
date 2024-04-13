import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResetPasswordComponent } from "./reset-password.component";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { setInputValue } from "@testing/forms";
import { getText } from "@testing/finders";
import { clickElement } from "@testing/click";



fdescribe('Test for ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;
    let userService: jasmine.SpyObj<UserService>;
  
    beforeEach(async () => {
      const userServiceSpy = jasmine.createSpyObj('UserService', ['updatePassword', 'redirect']);
  
      await TestBed.configureTestingModule({
        imports: [ ResetPasswordComponent, RouterTestingModule ],
        providers: [
          { provide: UserService, useValue: userServiceSpy },
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ResetPasswordComponent);
      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  
      component = fixture.componentInstance;
  
      fixture.detectChanges();
    });

    it('Should create ResetPasswordComponent', () => {
        expect(component).toBeDefined();
    });

    it('Test for passwordField, should be invalid', () => {
        component.passwordField?.setValue('not a password');
        expect(component.passwordField?.invalid).withContext('Not a valid password').toBeTruthy();
  
        component.passwordField?.setValue('');
        expect(component.passwordField?.invalid).withContext('empty field').toBeTruthy();
      });
  
      it('Test for confirmPasswordField, should be invalid', () => {
        component.confirmPasswordField?.setValue('confirmPassword');
        expect(component.confirmPasswordField?.invalid).withContext('Not a valid password').toBeTruthy();
  
        component.confirmPasswordField?.setValue('');
        expect(component.confirmPasswordField?.invalid).withContext('empty field').toBeTruthy();
      });

      it('Test for passwordField UI, should be invalid', () => {
      
        setInputValue(fixture, 'input#password', 'not a password');
        fixture.detectChanges();
        expect(component.passwordField?.invalid).withContext('Not a valid password');
  
        const textError = getText(fixture, 'passwordField-reset');
        expect(textError).toContain('Invalid password must contain at least one number, one special character, lowercase & uppercase');
      });
  
      it('Test for confirmPasswordField UI, should be invalid', () => {
        
        setInputValue(fixture, 'input#confirm_password ', 'another password');
        fixture.detectChanges();
        expect(component.confirmPasswordField?.invalid).withContext('passwords must match');
  
        const textError = getText(fixture, 'confirmPasswordField-reset');
        expect(textError).toContain('Passwords must match ');
      });

      it('Should test the form  resetPassword should be valid', () => {

        component.resetPassword.patchValue({
            password: 'gvGv80#5;3$Jt',
            confirm_password: 'gvGv80#5;3$Jt'
        });
  
        // Act
        component.changePassword(new Event('submit'));
        expect(component.resetPassword.valid).toBeTruthy();
        expect(userService.redirect).toHaveBeenCalled();
    
      });


      it('Should test the form resetPassword should be valid UI demo', () => {

        setInputValue(fixture, 'input#password', 'gvGv80#5;3$Jt');
        setInputValue(fixture, 'input#confirm_password', 'gvGv80#5;3$Jt');
       

        // Act
        clickElement(fixture, 'btn-changePassword', true);
        fixture.detectChanges();
        
        expect(component.resetPassword.valid).toBeTruthy();
        expect(userService.redirect).toHaveBeenCalled();
    
      });
});