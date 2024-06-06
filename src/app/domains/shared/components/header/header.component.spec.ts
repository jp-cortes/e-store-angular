import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";
import { AuthTokenService } from "@shared/services/auth-token.service";
import { CartService } from "@shared/services/cart.service";
import { MenuMobileComponent } from "@shared/components/menu-mobile/menu-mobile.component";
import { CategoryService } from "@shared/services/category.service";
import { generateCategories } from "@shared/models/category.mock";
import { of } from "rxjs";
import { getText, query, queryAll, queryAllByDirective, queryById } from "@testing/finders";
import { RouterLinkWithHref } from "@angular/router";

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
            { provide: CategoryService, useValue: categoryServiceSpy }
        ]
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;

    const categoriesMock = generateCategories(3);


    categoryService.getCategories.and.returnValue(of(categoriesMock));
    fixture.detectChanges(); // ngOnInit
 });

 it('should create HeaderComponent', () => {
    expect(component).toBeDefined();
    expect(categoryService.getCategories).toHaveBeenCalled()
 });

 describe('Test for navbar', () => {
  it('Should display <span>E-STORE</span>', () => {
    // Arrange
    const textContent = getText(fixture, 'shop-title');
    // Act
    fixture.detectChanges();
    // Assert
    expect(textContent).toContain('E-STORE');
  })

  it('Should display navbar routes Home, About, Services', () => {
    // Arrange
    const liDe = queryAll(fixture);
    const liEl: HTMLElement = liDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(liEl.textContent).toContain('Home');
    expect(liEl.textContent).toContain('About');
    expect(liEl.textContent).toContain('Services');
  });

  it('Should display tag MenuMobileComponent tag', () => {
    
    const elementMenuMobile = query(fixture, 'app-menu-mobile');
    
    fixture.detectChanges();
    
      expect(elementMenuMobile).not.toBeNull();
    
  
  });

  it('should be 9 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(9);
  });

 });


 describe('Test for shoppingCart', () => {
  it('Should display the shoppingCart', () => {
    // Arrange
    const cartEl = getText(fixture, 'shoppingcart-h3')
    // Act
    fixture.detectChanges();
    // Assert
    expect(cartEl).toContain('Your Cart is empty');
  });

  it('Should toggle the shoppingCart', () => {
    // Arrange
    const btnOpenDe = queryById(fixture, 'open-btn');;
    const btnCloseDe = queryById(fixture, 'close-btn');

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
