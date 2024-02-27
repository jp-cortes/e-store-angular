import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProductService } from "@shared/services/product.service";
import { ProductComponent } from "@products/components/product/product.component";
import { generateProducts } from "@shared/models/product.mock";
import { of } from "rxjs";
import { CategoryService } from "@shared/services/category.service";
import { generateCategories } from "@shared/models/category.mock";
import { ListComponent } from "./list.component";




fdescribe('listComponent',  () => {
let component: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let productService: jasmine.SpyObj<ProductService>;
let categoryService: jasmine.SpyObj<CategoryService>;

beforeEach(async () => {
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
  const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);

await TestBed.configureTestingModule({
  imports: [ ProductComponent, ListComponent, RouterTestingModule],
  providers: [
    { provide: ProductService, useValue: productServiceSpy },
    { provide: CategoryService, useValue: categoryServiceSpy },
  ]
})
.compileComponents();

});

beforeEach(() => {
  fixture = TestBed.createComponent(ListComponent);
  component = fixture.componentInstance;
  productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;

  const productsMock = generateProducts(3);
  const categoriesMock = generateCategories(3);

  productService.getProducts.and.returnValue(of(productsMock));
  categoryService.getCategories.and.returnValue(of(categoriesMock));
  fixture.detectChanges(); // OnInit
});

it('should create ListComponent', () => {
  expect(component).toBeDefined();
  expect(productService.getProducts).toHaveBeenCalled();
});

describe('Test for getProducts', () => {
  it('Should return a list of products', () => {
    // Arrange
    const productsMock = generateProducts();
    productService.getProducts.and.returnValue(of(productsMock));
    const countPrev = component.products.length;
    // Act
    component.getProducts();
    fixture.detectChanges();
    // Assert
    expect(component.products.length).toEqual(productsMock.length + countPrev);
  });
});

describe('Test for getCategories', () => {
  it('Should return a list of categories', () => {
    // Arrange
    const categoriesMock = generateCategories(3);
    categoryService.getCategories.and.returnValue(of(categoriesMock));

    // Act
    component.getCategories();
    fixture.detectChanges();
    // Assert
    expect(component.products.length).toEqual(categoriesMock.length);
  });
});

});
