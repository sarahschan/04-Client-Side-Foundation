import { Component } from '@angular/core';
import { PageEvent } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {

    title = "let's learn to count"
    
    number = 0
    imagePath = `/numbers/number${this.number}.jpg`

    whenNavigate(pageEvent: PageEvent) {
        this.number += pageEvent.delta * pageEvent.step
        // console.info(this.number)

        if (this.number < 0) {
          this.number += 31
          // console.info(`looped to ${this.number}`)
        } else if (this.number > 30) {
          this.number -= 31
          // console.info(`looped to ${this.number}`)
        }

        this.imagePath = `/numbers/number${this.number}.jpg`
    }


}
