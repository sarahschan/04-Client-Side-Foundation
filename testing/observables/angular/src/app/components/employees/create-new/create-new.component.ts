import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/models';

@Component({
  selector: 'app-create-new',
  standalone: false,
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.css'
})
export class CreateNewComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  private employeeService = inject(EmployeeService)

  protected addEmployeeForm!: FormGroup


  ngOnInit(): void {
    this.addEmployeeForm = this.createForm()    
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control<string>('', [ Validators.required, Validators.email ])
    })
  }


  protected submitEmployee() {
    const newEmployee: Employee = this.addEmployeeForm.value
    console.log('>>> Employee details recieved: ', newEmployee)
    this.saveEmployee(newEmployee)
  }


  private saveEmployee(newEmployee: Employee) {
    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        console.log('>>> Employee saved')
        this.addEmployeeForm.reset()
      },
      error: (error) => {
        console.error('>>> Error saving employee: ', error)
      }
    })
  }


}
