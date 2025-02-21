import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'my first angular component';

  myText = 'this is my text'

  texts: string[] = [
    // "big black bug bleeds black blood",
    // "she sells sea shells on the sea shore",
    // "how much wood can a wood chuck chuck if a wood chuck could chuck wood"
  ]

  allClicks = 0

  whenNewText(newText: string) {
    this.texts.push(newText)
  }

  // Event handler
  whenTotalClicks(idx: number, clicks: number){
    console.info(">>> got totalClicks event", clicks)
    console.info('Got clicks ${clicks} from ${idx}')
    this.allClicks += clicks
  }
}
