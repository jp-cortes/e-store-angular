import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
// import { NO_ERRORS_SCHEMA } from "@angular/core";

describe(' Test for AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AppComponent ],
            // schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should Create the component', () => {
        expect(component).toBeDefined();
    });
});