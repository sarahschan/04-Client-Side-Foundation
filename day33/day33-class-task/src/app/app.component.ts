import { Component } from '@angular/core';
import { Member } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'day33-class-task';

  members: Member[] = []

  addNewMember(newMember: Member) {
    this.members.push(newMember)
  }

}
