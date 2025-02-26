import { Component, Input } from '@angular/core';
import { Member } from '../../models';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})

export class MembersComponent {
  
  @Input()
  members: Member[] = []
  
}
