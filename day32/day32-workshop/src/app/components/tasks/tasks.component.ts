import { Component, Input } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input()
  tasks: Task[] = []
  
}
