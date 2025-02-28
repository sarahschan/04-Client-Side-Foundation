import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private employeeService = inject(EmployeeService)
  private formBuilder = inject(FormBuilder)
  
  protected form!: FormGroup

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  }

  ngOnInit() : void {

    this.form = this.createForm()

    const id = this.route.snapshot.params['id']
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data: Employee) => {
        this.employee = data
        this.form.patchValue(this.employee)
      },
      error: (error) => {
        console.error('>>> Error fetching employee to edit: ', error)
      }
    })

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: this.formBuilder.control<number>(0),
      firstName: this.formBuilder.control<string>(''),
      lastName: this.formBuilder.control<string>(''),
      emailId: this.formBuilder.control<string>('')
    })
  }

  protected updateEmployee() {
    const updatedEmployee = this.form.getRawValue() // Get the full value including disabled fields
    this.employeeService.updateEmployee(String(this.employee.id), updatedEmployee).subscribe({
      next: (data) => {
        console.log('Employee updated successfully!', data)
        this.router.navigate(['/employeeList'])
      },
      error: (error) => {
        console.error('Error updating employee:', error)
      }
    })
  }
}
