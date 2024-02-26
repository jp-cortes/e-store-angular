import { ComponentFixture, TestBed } from "@angular/core/testing";
import ListComponent from "./list.component";
import { ProductService } from "@shared/services/product.service";
import { ProductComponent } from "@products/components/product/product.component";
import { generateProducts } from "@shared/models/product.mock";
import { of } from "rxjs";




fdescribe('listComponent',  () => {
let component: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let productService: jasmine.SpyObj<ProductService>;

beforeEach(async () => {
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

await TestBed.configureTestingModule({
  imports: [ ProductComponent, ListComponent],
  providers: [
    { provide: ProductService, useValue: productServiceSpy },
  ]
})
.compileComponents();

});

beforeEach(() => {
  fixture = TestBed.createComponent(ListComponent);
  component = fixture.componentInstance;
  productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

  const productsMock = generateProducts(3);
  productService.getProducts.and.returnValue(of(productsMock));
  fixture.detectChanges(); // OnInit
});

it('should create ListComponent', () => {
  expect(component).toBeDefined();
  expect(productService.getProducts).toHaveBeenCalled();
});

xdescribe('Test for getProducts', () => {
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

});
