import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./sign-up.component";
import { UserService } from "@shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { generateCustomer, generateSignUpCustomer } from "@shared/models/user.mock";
import { of } from "rxjs";



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

    it('Test for nameFiled should be invalid', () => {
      component.nameField?.setValue('#$%^&)@!');
      expect(component.nameField?.invalid).withContext('Not a name').toBeTruthy();

      component.nameField?.setValue('');
      expect(component.nameField?.invalid).withContext('empty field').toBeTruthy();
    });


});