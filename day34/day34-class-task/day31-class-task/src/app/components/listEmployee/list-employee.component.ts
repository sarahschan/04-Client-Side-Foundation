import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/models';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})

export class ListEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  employees: Employee[] = []

  dataSource = new MatTableDataSource<Employee>(this.employees)
  displayedColumns: string[] = ['id', 'fname', 'lname', 'email']

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data
        this.dataSource.data = this.employees
        this.dataSource.paginator = this.paginator
        console.log('Employees: ', this.employees)
      },
      error: (error) => {
        console.error('Error fetching employees: ', error)
      }
    }
    )
  }

}