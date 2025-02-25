import { Component } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'To Do List';

  tasks: Task[] = []
  
  addTask(task: Task) {
    console.info('>>> Recieved Task from todo component: ', task)
    this.tasks.push(task)
  }
}
