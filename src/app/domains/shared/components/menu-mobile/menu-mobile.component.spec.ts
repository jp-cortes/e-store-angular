import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuMobileComponent } from './menu-mobile.component';
import { CategoryService } from '@shared/services/category.service';
import { generateCategories } from '@shared/models/category.mock';
import { of } from 'rxjs';

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
  });
});