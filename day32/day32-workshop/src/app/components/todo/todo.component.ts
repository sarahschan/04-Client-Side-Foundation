import { Component, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { futureOrPresentValidator } from '../../validators/futureOrPresent.validator';
import { Task } from '../../models';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  private formBuilder = inject(FormBuilder)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm() {
    return this.formBuilder.group({
      description: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(5) ]),
      priority: this.formBuilder.control<string>('low'),
      dueDate: this.formBuilder.control<string>('', [ Validators.required, futureOrPresentValidator() ])
    })
  }

  protected fieldError(fieldName: string): boolean {
    const field = this.form.get(fieldName) as FormControl
    return field.dirty && field.invalid
  }

  protected isFormInvalid() {
    return this.form.invalid
  }

  @Output()
  addTask = new Subject<Task>()
  
  protected handleAddTask() {
    const newTask: Task = this.form.value
    this.addTask.next(newTask)
      // console.info('>>> sent Task to AppComponent: ', newTask)
  }

}
