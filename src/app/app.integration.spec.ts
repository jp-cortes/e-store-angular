import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app.routes";
import { CategoryService } from "@shared/services/category.service";
import { ProductService } from "@shared/services/product.service";
import { generateCategories } from "@shared/models/category.mock";
import { of } from "rxjs";
import { clickElement } from "@testing/click";
import { query, queryAllByDirective } from "@testing/finders";
import { UserService } from "@shared/services/user.service";
import { AuthTokenService } from "@shared/services/auth-token.service";



describe('Integration test', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let router: Router;
    let categoryService: jasmine.SpyObj<CategoryService>;
    let productService: jasmine.SpyObj<ProductService>;
    let userService: jasmine.SpyObj<UserService>;
    let authTokenService: jasmine.SpyObj<AuthTokenService>

    beforeEach(async () => {
      const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
      const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
      const userServiceSpy = jasmine.createSpyObj('UserService', ['signIn','redirect']);
      const authTokenServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getToken']);

        await TestBed.configureTestingModule({
            imports: [ AppComponent, RouterTestingModule.withRoutes(routes) ],
            providers: [
              { provide: CategoryService, useValue: categoryServiceSpy },
              { provide: ProductService, useValue: productServiceSpy },
              { provide: UserService, useValue: userServiceSpy },
              { provide: AuthTokenService, useValue: authTokenServiceSpy },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    });


    beforeEach( fakeAsync(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      
      // providers
      router = TestBed.inject(Router);
      categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
      productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
      authTokenService = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
      
      const categoriesMock = generateCategories(3);

      categoryService.getCategories.and.returnValue(of(categoriesMock));
      
      authTokenService.getToken.and.returnValue('');

      router.initialNavigation();

        tick(); // wait while nav...
        fixture.detectChanges();
    }));


    it('Should Create the component', () => {
        expect(component).toBeDefined();
        expect(categoryService.getCategories).toHaveBeenCalled();
    });


    it('Should render ListComponent at home page', fakeAsync(() => {
      
      clickElement(fixture, 'home-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit ListComponent and  HeaderComponent

      expect(router.url).toEqual('/');

      const elementHeader = query(fixture, 'app-header');
      const elementList = query(fixture, 'app-list');

      expect(elementHeader).not.toBeNull();
      expect(elementList).not.toBeNull();
    }));


    it('should be 13 routerLinks', () => {
      const links = queryAllByDirective(fixture, RouterLinkWithHref);
      expect(links.length).toEqual(13);
    });


    it('Should render AboutComponent when is clicked', fakeAsync(() => {

      clickElement(fixture, 'about-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit AboutComponent;
     
      expect(router.url).toEqual('/about');
      const element = query(fixture, 'app-about');
      expect(element).not.toBeNull();
       
      // destroy component
      fixture.destroy();
    }));


    it('Should navigate to sign-in route and render SignInComponent when is clicked', fakeAsync(() => {
     
      clickElement(fixture, 'sign-in-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit SignInComponent;

      expect(router.url).toEqual('/sign-in');
      const element = query(fixture, 'app-sign-in');
      expect(element).not.toBeNull();
    }));


    it('Should navigate to sign-up route and render SignUpComponent when is clicked', fakeAsync(() => {

      clickElement(fixture, 'sign-in-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit SignInComponent;

      // go to sign-in route
      expect(router.url).toEqual('/sign-in');

      // click to navigate sign-up route
      clickElement(fixture, 'sign-up-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit SignUpComponent;

      expect(router.url).toEqual('/sign-up');
      const signUpComponent = query(fixture, 'app-sign-up');
      expect(signUpComponent).not.toBeNull();
    }));


    it('Should navigate to sign-up route and render PasswordRecoveryComponent when is clicked', fakeAsync(() => {

      clickElement(fixture, 'sign-in-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit SignInComponent;

      // go to sign-in route
      expect(router.url).toEqual('/sign-in');

      // click to navigate password-recovery route
      clickElement(fixture, 'password-recovery-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit PasswordRecoveryComponent;

      expect(router.url).toEqual('/password-recovery');
      const signUpComponent = query(fixture, 'app-password-recovery');
      expect(signUpComponent).not.toBeNull();
    }));


    it('Should render NotFoundComponent when is clicked', fakeAsync(() => {

      clickElement(fixture, 'services-route', true);

      tick(); // wait while nav...
      fixture.detectChanges(); // ngOnInit NotFoundComponent;

      expect(router.url).toEqual('/services');
      const element = query(fixture, 'app-not-found');
      expect(element).not.toBeNull();
    }));
    
    
});