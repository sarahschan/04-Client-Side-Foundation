import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      dueDate: this.formBuilder.control<string>('', [ Validators.required ])
    })
  }

}
