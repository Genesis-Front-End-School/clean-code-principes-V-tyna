import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonName: string;
  @Input() clickHandlerFn: Function;
}
