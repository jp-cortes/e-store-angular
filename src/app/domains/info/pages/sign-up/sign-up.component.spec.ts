import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./sign-up.component";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { generateCustomer, generateSignUpCustomer } from "@shared/models/user.mock";
import { of } from "rxjs";
import { getText, query } from "@testing/finders";



describe('Test for SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let userService: jasmine.SpyObj<UserService>;
  
    beforeEach(async () => {
      const userServiceSpy = jasmine.createSpyObj('UserService', ['signUp']);
  
      await TestBed.configureTestingModule({
        imports: [ SignUpComponent, RouterTestingModule ],
        providers: [
          { provide: UserService, useValue: userServiceSpy },
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SignUpComponent);
      // userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

      // const customerMock = generateCustomer();
      
      // userService.signUp.and.returnValue(of(customerMock));
  
      component = fixture.componentInstance;
  
      fixture.detectChanges();
    });

    it('Should create SignUpComponent', () => {
        expect(component).toBeDefined();
    });

    it('Test for nameFiled, should be invalid', () => {
      component.nameField?.setValue('afsfs^&)@!');
      expect(component.nameField?.invalid).withContext('Not a name').toBeTruthy();

      component.nameField?.setValue('');
      expect(component.nameField?.invalid).withContext('empty field').toBeTruthy();
    });

    it('Test for lastnameFiled, should be invalid', () => {
      component.lastNameField?.setValue('#$%^&)@!8090987');
      expect(component.lastNameField?.invalid).withContext('Not a lastname').toBeTruthy();

      component.lastNameField?.setValue('');
      expect(component.lastNameField?.invalid).withContext('empty field').toBeTruthy();
    });

    it('Test for phoneField, should be invalid', () => {
      component.phoneField?.setValue('012345');
      expect(component.phoneField?.invalid).withContext('Not a phone number').toBeTruthy();

      component.phoneField?.setValue('');
      expect(component.phoneField?.invalid).withContext('empty field').toBeTruthy();
    });

    it('Test for emailField, should be invalid', () => {
      component.emailField?.setValue('examplemail.com');
      expect(component.emailField?.invalid).withContext('Not a valid email').toBeTruthy();

      component.emailField?.setValue('');
      expect(component.emailField?.invalid).withContext('empty field').toBeTruthy();
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

    it('Test for passwordValidator, should be invalid', () => {
      expect(component.passwordMatchValidator.valueOf()).withContext('Not a passwords must match').toBeTruthy();
    });


    it('Test for nameField UI, should be invalid', () => {
      // Arrange
      const inputDe = query(fixture, 'input#name');
      const inputEl: HTMLInputElement = inputDe.nativeElement;

      // Act
      inputEl.value = 'J0hnny';
      inputEl.dispatchEvent(new Event('input')); // focusS
      inputEl.dispatchEvent(new Event('blur')); // unfocus
      fixture.detectChanges();
      
      // Assert
      expect(component.nameField?.invalid).withContext('Not a name').toBeTruthy();

      const textError = getText(fixture, 'nameField-name');
      expect(textError).toContain('Invalid name');

    });


});