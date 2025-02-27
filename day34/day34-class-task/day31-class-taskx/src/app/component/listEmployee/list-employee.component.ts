import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})

export class ListEmployeeComponent implements OnInit {
  
  private employeeService = inject(EmployeeService)


  employees: Employee[] = []
  
  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data
    })
  }

}
