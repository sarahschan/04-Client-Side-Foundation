import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})

export class ListEmployeeComponent implements OnInit {

  employees: Employee[] = []

  displayedColumns: string[] = ['id', 'fname', 'lname', 'email']

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data
        console.log('Employees: ', this.employees)
      },
      error: (error) => {
        console.error('Error fetching employees: ', error)
      }
    }
    )
  }

}