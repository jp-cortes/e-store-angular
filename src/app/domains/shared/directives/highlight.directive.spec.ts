import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { HighlightDirective } from "./highlight.directive";
import { queryAllByDirective, queryAllBySelector } from "@testing/finders";

@Component({
    template: `
        <h2 class="title" highlight>Title</h2>
        <p highlight>yellow</p>
        <h5 class="subtitle">Subtitle</h5>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        `
})
class HostComponent { }

describe('HighlightDirective', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ HostComponent ],
            imports: [ HighlightDirective ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    });

    it('Should create HostComponent', () => {
        expect(component).toBeDefined();
    });

    it('Should highlight 2 element', () => {
        const elements = queryAllByDirective(fixture, HighlightDirective);
        const elementsWithout = queryAllBySelector(fixture, '*:not([highlight])');
        expect(elements.length).toEqual(2);
        expect(elementsWithout.length).toEqual(2);
    });

    it('Should match the bgColor', () => {
        const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
        expect(elements[0].nativeElement.style.backgroundColor).toEqual('yellow');
        expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
        
    });



});
