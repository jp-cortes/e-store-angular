import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuMobileComponent } from './menu-mobile.component';
import { CategoryService } from '@shared/services/category.service';
import { generateCategories } from '@shared/models/category.mock';
import { of } from 'rxjs';
import { queryById } from '@testing/finders';

describe('Test for MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;


  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    
    await TestBed.configureTestingModule({
      imports: [ MenuMobileComponent, RouterTestingModule ],
      providers: [
        {provide: CategoryService, useValue: categoryServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMobileComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;

    
    const categoriesMock = generateCategories(3);
    
    categoryService.getCategories.and.returnValue(of(categoriesMock));
    fixture.detectChanges();
});



it('should create', () => {
    expect(component).toBeDefined();
    expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('Should display the text "Menu" in tag h5', () => {
    // Arrange
    const h5De = queryById(fixture, 'menu-mobile-title');
    const h5El: HTMLElement = h5De.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h5El.textContent).toContain('Menu');
  });

  
  
  it('Should toggle the signal showSideMenu', () => {
    const btnOpenDe = queryById(fixture, 'open-menu-btn');
    const btnCloseDe = queryById(fixture, 'close-menu-btn')

    // Act
    //this click should change the signal showSideMenu() false
    btnOpenDe.triggerEventHandler('click', null);

    fixture.detectChanges();
    // Assert
    expect(component.showSideMenu()).toBe(false);

    // this click should change the signal showSideMenu() to true
    btnCloseDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showSideMenu()).toBe(true);
  });

  
  
  it('Should return a list of categories', () => {
    // Arrange
    const categoriesMock = generateCategories(3);
    categoryService.getCategories.and.returnValue(of(categoriesMock));
    const liDe = queryById(fixture, 'categories-title');
    const liEl: HTMLElement = liDe.nativeElement;

    // Act
    component.getCategories();

    expect(liEl).toBeDefined();

    fixture.detectChanges();
    // Assert
    expect(component.categories().length).toEqual(categoriesMock.length);
    expect(component.categories()).toEqual(categoriesMock)
  });


});