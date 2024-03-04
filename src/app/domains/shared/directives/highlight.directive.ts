import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  element = inject(ElementRef);
  defaultColor = 'yellow'
  
  constructor() { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

}
