import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  private employeeService = inject(EmployeeService)

  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'actions']
  dataSource = new MatTableDataSource<Employee>([])

  ngOnInit(): void {
    this.fetchEmployees()
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.dataSource.data = data
        console.log('>>> Employees fetched: ', data)
      },
      error: (error) => {
        console.error('>>> Error fetching employees: ', error)
      }
    })
  }
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  deleteEmployeeById(empId: string) {
    console.info('>>> empId to delete: ', empId)
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        this.fetchEmployees()
      },
      error: (error) => {
        console.error('>>> Error deleting employee', error)
      }
    })
  }

}

