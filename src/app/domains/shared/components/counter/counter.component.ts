import { Component, Input, SimpleChange } from '@angular/core';
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

constructor() {
  // NO ASYNC
  // Icalled before render
  console.log('constructor');
  console.log('-'.repeat(10));
}

ngOnChanges(changes: SimpleChange) {
  console.log('ngOnChanges');
  console.log('-'.repeat(10));
  console.log(changes);
}

}
