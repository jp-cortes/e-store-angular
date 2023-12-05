import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[Hightlight]',
  standalone: true
})
export class HightlightDirective {
  element = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'yellow'
  }

}
