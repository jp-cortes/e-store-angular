import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSkeletonComponent } from './product-skeleton.component';


describe('ProductSkeletonComponent', () => {
  let component: ProductSkeletonComponent;
  let fixture: ComponentFixture<ProductSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductSkeletonComponent', () => {
    expect(component).toBeDefined();
  });
});