import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-employees',
  standalone: false,
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit, OnDestroy {

  private employeeService = inject(EmployeeService)


  private subscription: Subscription | null = null
  protected employeesList: Employee[] = []


  ngOnInit(): void {
    this.subscription = this.employeeService.employees$.subscribe(
      employees => {
        this.employeesList = employees
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  
}
