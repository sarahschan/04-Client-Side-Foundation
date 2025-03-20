import { Component, inject, OnInit } from '@angular/core';
import { TaskStore } from '../../../store/task.store';
import { Observable } from 'rxjs';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  private taskStore = inject(TaskStore)
  protected tasks$!: Observable<Task[]>

  ngOnInit(): void {
    this.tasks$ = this.taskStore.getTasks$('all')
    console.log(this.tasks$)
  }


  filterByPriority(event: any) {
    let priorityVal = event.target.value
    console.log('Getting priority: ', priorityVal)
    this.tasks$ = this.taskStore.getTasks$(priorityVal)
  }


  deleteTask(taskid: string){
    console.log("Delete task >> ${taskid}", taskid);
    this.taskStore.deleteTask(taskid);
}
}
