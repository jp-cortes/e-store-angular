import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";
import { provideHttpClient } from "@angular/common/http";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { CartService } from "@shared/services/cart.service";
import { MenuMobileComponent } from "@shared/components/menu-mobile/menu-mobile.component";
import { CategoryService } from "@shared/services/category.service";

fdescribe('HeaderComponent', () => {
 let component: HeaderComponent;
 let httpControler: HttpTestingController;
 let routerTestingModule: RouterTestingModule;
 let fixture: ComponentFixture<HeaderComponent>;
 let cartService: CartService;
 let authTokenService: AuthTokenService;
 let categoryService: jasmine.SpyObj<CategoryService>;

 beforeEach(async () => {
   const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories'])

    await TestBed.configureTestingModule({
        imports: [ HeaderComponent, MenuMobileComponent, HttpClientTestingModule, RouterTestingModule ],
        providers: [
            AuthTokenService,
            CartService,
            { provide: categoryService, useValue: categoryServiceSpy }
        ]
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    authTokenService = TestBed.inject(AuthTokenService);
    httpControler = TestBed.inject(HttpTestingController);
    routerTestingModule = TestBed.inject(RouterTestingModule);
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>
    fixture.detectChanges(); // ngOninit
 });

 it('should create HeaderComponent', () => {
    expect(component).toBeDefined();
 });

 it('Should display <span>E-STORE</span>', () => {
   const spanDe: DebugElement = fixture.debugElement.query(By.css('nav a span.self-center'));
   const spanEl: HTMLElement = spanDe.nativeElement;
   // Act
   fixture.detectChanges();
   // Assert
   expect(spanEl.textContent).toContain('E-STORE')
 })

 it('Should display navbar routes Home, About, Services', () => {
   const liDe: DebugElement = fixture.debugElement.query(By.all());
   const liEl: HTMLElement = liDe.nativeElement;
   // Act
   fixture.detectChanges();
   // Assert
   expect(liEl.textContent).toContain('Home');
   expect(liEl.textContent).toContain('About');
   expect(liEl.textContent).toContain('Services');
   // expect(liEl.textContent).toContain('Sing in');
 })

});
