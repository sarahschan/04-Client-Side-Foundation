import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-details-employee',
  standalone: false,
  templateUrl: './details-employee.component.html',
  styleUrl: './details-employee.component.css'
})
export class DetailsEmployeeComponent implements OnInit {

  private employeeService = inject(EmployeeService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id']
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data: Employee) => {
        this.employee = data
      },
      error: (error) => {
        console.error('>>> Error fetching employee details: ', error)
      }
    })
  }



}
