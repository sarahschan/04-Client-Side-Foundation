import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text',
  standalone: false,
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})

export class TextComponent {

    // define a member and annotate it with @Input
    @Input()
    text: string = ''   // input's name is text

    // define a event with number as the event payload
    @Output()
    totalClicks = new Subject<number>()


    protected counter = 0

    protected textClicked(){
      this.counter++
    }

    protected clearCounter(){
      this.counter = 0
    }

    protected fireClicks(){
      this.totalClicks.next(this.counter)
    }
}
