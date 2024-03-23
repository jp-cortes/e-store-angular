import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LayoutComponent } from "./layout.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "../header/header.component";
import { CategoryService } from "@shared/services/category.service";
import { generateCategories } from "@shared/models/category.mock";
import { of } from "rxjs";
import { query } from "@testing/finders";


describe('Test for LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let categoryService: jasmine.SpyObj<CategoryService>;
   
    beforeEach(async () => {
        const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories'])

       await TestBed.configureTestingModule({
           imports: [ LayoutComponent, HeaderComponent, RouterTestingModule ],
           providers: [
            { provide: CategoryService, useValue: categoryServiceSpy }
           ]
       })
       .compileComponents();
    });
   
    beforeEach(() => {
       fixture = TestBed.createComponent(LayoutComponent);
       categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
       component = fixture.componentInstance;

       const categoriesMock = generateCategories(3);


       categoryService.getCategories.and.returnValue(of(categoriesMock));
       fixture.detectChanges(); // ngOnInit
    });
   
    it('should create LayoutComponent', () => {
       expect(component).toBeDefined();
       expect(categoryService.getCategories).toHaveBeenCalled();
    });
   
    it('Should display tag <app-header />', () => {
       // Arrange
       const spanDe = query(fixture, 'app-header');
       const spanEl: HTMLElement = spanDe.nativeElement;
       // Act
       fixture.detectChanges();
       // Assert
       expect(spanEl).toBeDefined();
     });
   
     it('Should display tag <router-outlet />', () => {
        // Arrange
        const spanDe = query(fixture, 'router-outlet');
        const spanEl: HTMLElement = spanDe.nativeElement;
        // Act
        fixture.detectChanges();
        // Assert
        expect(spanEl).toBeDefined();
      });
   });