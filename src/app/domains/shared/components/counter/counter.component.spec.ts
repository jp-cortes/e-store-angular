import { By } from "@angular/platform-browser";
import { CounterComponent } from "./counter.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";



describe('Test for CounterComponent', () => {
 let component: CounterComponent;
 let fixture: ComponentFixture<CounterComponent>;

 beforeEach(async () => {

    await TestBed.configureTestingModule({
        imports: [ CounterComponent, RouterTestingModule ],
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit
 });

 it('should create CounterComponent', () => {
    expect(component).toBeDefined();
 });

 it('Should display tag <span>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('span'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain(0);
  });

});