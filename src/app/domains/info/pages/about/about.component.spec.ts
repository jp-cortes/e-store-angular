import { ComponentFixture, TestBed } from "@angular/core/testing";
import AboutComponent from "./about.component";
import { RouterTestingModule } from "@angular/router/testing";
import { WaveAudioComponent } from "@info/components/wave-audio/wave-audio.component";
import { CounterComponent } from "@shared/components/counter/counter.component";
import { HighlightDirective } from "@shared/directives/highlight.directive";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";



describe('AboutComponent', () => {
 let component: AboutComponent;
 let fixture: ComponentFixture<AboutComponent>;

 beforeEach(async () => {
   const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories'])

    await TestBed.configureTestingModule({
        imports: [ AboutComponent, CounterComponent, WaveAudioComponent, HighlightDirective, RouterTestingModule ],
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit
 });

 it('should create AboutComponent', () => {
    expect(component).toBeDefined();
 });


 it('Should display <h1>About</h1>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('h1'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain('About');
  });


  it('Should display <p>Lorem</p>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('p.font-medium'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain('Lorem ipsum');
  });

  it('Should highlight text in <span> tag', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements.length).toEqual(4);
});

it('Should display tag <app-wave-audio/>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('div app-wave-audio'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl).toBeTruthy();
  });

  it('Should display tag <app-counter/>', () => {
    // Arrange
    const spanDe: DebugElement = fixture.debugElement.query(By.css('div app-counter'));
    const spanEl: HTMLElement = spanDe.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(spanEl.textContent).toContain(0);
  });

});