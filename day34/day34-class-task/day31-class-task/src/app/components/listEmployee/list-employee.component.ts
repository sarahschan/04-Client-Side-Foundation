import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

export class ListEmployeeComponent implements OnInit, AfterViewInit {

  constructor(private employeeService: EmployeeService) { }

  employees: Employee[] = []

  dataSource = new MatTableDataSource<Employee>(this.employees)
  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'actions']

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data
        this.dataSource.data = this.employees
        console.log('Employees: ', this.employees)
      },
      error: (error) => {
        console.error('Error fetching employees: ', error)
      }
    }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

}
