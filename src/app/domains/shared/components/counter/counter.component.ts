import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
@Input({ required: true }) duration = 0;
@Input({ required: true }) message = '';
counter = signal(0);
counterRef: number | undefined;

constructor() {
  // NO ASYNC
  // Is called before render
  console.log('constructor');
  console.log('-'.repeat(10));
}

ngOnChanges(changes: SimpleChanges) {
  console.log('ngOnChanges');
  console.log('-'.repeat(10));
  console.log(changes);

  // the braces notation because This notation allows you to access properties dynamically
  const duration = changes['duration'];
  // by using a variable or a string containing the property's name

  if(duration && duration.currentValue !== duration.previousValue) {
    this.doSomething()
  }
}
ngOnInit() {
  // after render
  // onces
  //async, then, subs
  console.log('ngOnInit');
  console.log('-'.repeat(10));
  console.log('duration =>', this.duration);
  console.log('message =>', this.message);
}

ngAfterViewInit() {
  // after render
  //after render children components
  console.log('ngAfterViewInit');
  console.log('-'.repeat(10));
  this.counterRef = window.setInterval(() => {
    console.log('run interval');
    this.counter.update(prevState => prevState + 1)
  }, 1000);
}

ngOnDestroy() {
  console.log('ngOnDestroy');
  console.log('-'.repeat(10));
  window.clearInterval(this.counterRef);
}

doSomething() {
  console.log('doing something');
}

}
