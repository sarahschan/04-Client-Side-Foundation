import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/models';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  private employeeService = inject(EmployeeService)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
      lastName: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
      emailId: this.formBuilder.control<string>('', [ Validators.required, Validators.email])
    })
  }

  postEmployee() {
    const newEmployee: Employee = this.form.value
    console.log('>>> Employee details recieved: ', newEmployee)
    this.saveEmployee(newEmployee)
  }

  saveEmployee(newEmployee: Employee) {
    this.employeeService.createEmployee(newEmployee).subscribe({
      next: () => {
        console.log('>>> Employee saved')
        this.form.reset()
      },
      error: (error) => {
        console.error('>>> Error saving employee', error)
      }
    })
  }
}
