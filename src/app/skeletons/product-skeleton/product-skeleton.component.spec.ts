import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductSkeletonComponent } from './product-skeleton.component';
import { generateOneProduct } from '@shared/models/product.mock';

describe('ProductSkeletonComponent', () => {
  let component: ProductSkeletonComponent;
  let fixture: ComponentFixture<ProductSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductSkeletonComponent, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const product = generateOneProduct();
    fixture = TestBed.createComponent(ProductSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductSkeletonComponent', () => {
    expect(component).toBeDefined();
  });
});