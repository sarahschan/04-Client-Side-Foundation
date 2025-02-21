import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent implements OnInit {
    
    // inject form builder (@Autowire)
    private fb = inject(FormBuilder)

    // create form group and form array
    protected form!: FormGroup
    protected collaborators!: FormArray


    ngOnInit(): void {    // this creates the actual form using the createForm() method
        console.info(`>>> in ngOnInit`)
        this.form = this.createForm()
    }


    protected processForm() {
        const newTask: Task = this.form.value     // <- After making the task model in models.ts
            console.info('>>> form: ', newTask)   //    bind the values from the form to your task object
        // const values: any = this.form.value    // <- Original plain value extraction for reference
        //    
        //    console.info('>>> form: ', values)
    }

    // protected processForm(): void {                  // Reference if you want to add additional fields
    //   const formValue = this.form.value              // for some reason
    //   const values: Task = {
    //       ...formValue,
    //       additionalPriority : formValue.priority
    //   }
    //   console.info('>>> form: ', values)
    // }


    // Methods for repeated form validation in html
    protected isFieldValid(field: string): boolean{
        return !!this.form.get(field)?.valid
    }

    protected isFieldInvalid(field: string): boolean{
      return !!this.form.get(field)?.invalid
    }


    // Methods to add collaborators and remove in form display
    protected addCollaborator() {
        // const col = this.createCollaborator()
        // this.collaborators.push(col)
        this.collaborators.push(this.createCollaborator())
    }

    protected removeCollaborator(idx: number) {
        this.collaborators.removeAt(idx)
    }


    // Custom method to check validation of whole form (disabling of add task button)
    protected checkFormInvalid() {
        return this.form.invalid || this.collaborators.length <= 0
    }

    private createForm() : FormGroup {
        this.collaborators = this.fb.array([])
        return this.fb.group({
            taskName: this.fb.control<string>('', [ Validators.required, Validators.minLength(3)]),
            priority: this.fb.control<string>('1'),
            dueDate: this.fb.control<string>('', [ Validators.required ]),
            urgency: this.fb.control<number>(2),
            comments: this.fb.control<string>(''),
            procrastinate: this.fb.control<boolean>(false),
            collaborators: this.collaborators
        })
    }


    private createCollaborator() : FormGroup {
        return this.fb.group({
            name: this.fb.control<string>('', [ Validators.required ]),
            email: this.fb.control<string>('', [ Validators.required, Validators.email])
        })
    }

    urgency = "2"

    protected updateUrgency(event: any){
      this.urgency = event.target.value
    }
}


