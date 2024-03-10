import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotFoundComponent } from "./not-found.component";
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";



fdescribe('Test for NotFoundComponent', () => {
    let component: NotFoundComponent;
 let fixture: ComponentFixture<NotFoundComponent>;

 beforeEach(async () => {

    await TestBed.configureTestingModule({
        imports: [ NotFoundComponent, RouterTestingModule ],
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
 });

 it('should create NotFoundComponent', () => {
    expect(component).toBeDefined();
 });


 it('Should display <h1>404</h1>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('section h1'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain('404');
  });

  it('Should display Tag <p>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('section p'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain("Something's missing.");
  });

  it('Should display Tag Back to Homepage', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('section a'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain("Back to Homepage");
  });

});