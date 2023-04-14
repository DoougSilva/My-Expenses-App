import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  standalone: true
})
export class DisplayComponent  implements OnInit {
  @Input() entity: string = '';
  @Input() value: string = '';

  constructor() { }

  ngOnInit() {}

}
