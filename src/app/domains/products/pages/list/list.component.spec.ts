import { ComponentFixture, TestBed } from "@angular/core/testing";
import ListComponent from "./list.component";
import { ProductService } from "@shared/services/product.service";
import { ProductComponent } from "@products/components/product/product.component";




xdescribe('listComponent',  () => {
let component: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let productService: jasmine.SpyObj<ProductService>;

beforeEach(async () => {
  const producServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

await TestBed.configureTestingModule({
  declarations: [ ProductComponent, ListComponent]
})

});

});
