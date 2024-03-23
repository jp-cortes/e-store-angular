import { DebugElement, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
    const debugElement: DebugElement = fixture.debugElement.query(By.css(selector));
    if(!debugElement) {
        throw new Error(`query: Element with ${selector} not found`);
    }
    return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
    const selector = `[data-testid="${testId}"]`;
    return query(fixture, selector);
}

export function getText<T>(fixture: ComponentFixture<T>, testId: string) {
    const debuElement = queryById(fixture, testId);
    const element: HTMLElement = debuElement.nativeElement; 
    return element.textContent;
}

export function queryAll<T>(fixture: ComponentFixture<T>) {
    const debugElement: DebugElement = fixture.debugElement.query(By.all());
    return debugElement;
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(directive));
    return debugElement;
}