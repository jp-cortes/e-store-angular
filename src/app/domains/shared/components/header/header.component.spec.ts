import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";
import { provideHttpClient } from "@angular/common/http";

describe('HeaderComponent', () => {
 let component: HeaderComponent;
 let fixture: ComponentFixture<HeaderComponent>;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ HeaderComponent ],
        providers: [
            provideHttpClient(),
            provideHttpClientTesting()
        ]
    })
    .compileComponents();
 });

 beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // life
 });

 it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
 });

});