import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";

xdescribe('HeaderComponent', () => {
 let component: HeaderComponent;
 let fixture: ComponentFixture<HeaderComponent>;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ HeaderComponent ]
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