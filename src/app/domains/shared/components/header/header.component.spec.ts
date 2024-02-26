import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { CartService } from "@shared/services/cart.service";
import { MenuMobileComponent } from "@shared/components/menu-mobile/menu-mobile.component";
import { CategoryService } from "@shared/services/category.service";

describe('HeaderComponent', () => {
 let component: HeaderComponent;
 let fixture: ComponentFixture<HeaderComponent>;
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
    fixture.detectChanges(); // ngOnInit
 });

 it('should create HeaderComponent', () => {
    expect(component).toBeDefined();
 });

 describe('Test for navbar', () => {
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
  });

 });


 describe('Test for shoppingCart', () => {
  it('Should display the shoppingCart', () => {
    const cartDe: DebugElement = fixture.debugElement.query(By.css('div h3.mb-8'));
    const cartEl: HTMLElement = cartDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(cartEl.textContent).toContain('Your Cart is empty');
  });

  it('Should toggle the shoppingCart', () => {
    const btnOpenDe: DebugElement = fixture.debugElement.query(By.css('nav div button.rounded'));
    const btnCloseDe: DebugElement = fixture.debugElement.query(By.css('div.fixed div.flex button.bg-transparent '));

    // Act
    //this click should change the signal hideCart() false
    btnOpenDe.triggerEventHandler('click', null);

    fixture.detectChanges();
    // Assert
    expect(component.hideCart()).toBe(false);

    // this click should change the signal hideCart() to true
    btnCloseDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.hideCart()).toBe(true);
  });
 });

});
