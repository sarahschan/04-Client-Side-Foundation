import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskStore } from '../../store/task.store';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  private fb = inject(FormBuilder)
  protected taskForm!: FormGroup
  private taskStore = inject(TaskStore)

  ngOnInit(): void {
    this.taskForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      priority: this.fb.control<string>('low')
    })
  }

  processForm() {

    console.log('Form recieved: ', this.taskForm.value)

    const newTask: Task = {
      id: '',
      ...this.taskForm.value
    }

    console.log('Task created: ', newTask)

    this.taskStore.saveTask(newTask)
      // when this is called, the taskStore (Component Store) wraps the task object in an observable
      //  this is part of how the effect method in ComponentStore is implemented
      //
      // Behind the scenes process:
      //    1. saveTask(newTask) is called with a regular Task object
      //    2. The ComponentStore crates a Subject/Observable for this method if it doesn't exist arleady
      //    3. It then calls subject.next(newTask) to emit your task through that observable
      //    4. the saveTask method continues with this wrapped observable

    this.taskForm = this.createForm()

  }
}
