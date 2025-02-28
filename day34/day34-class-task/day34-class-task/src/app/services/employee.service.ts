import { Injectable } from '@angular/core';
import { Employee } from '../models/models';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = environment.apiUrl

  // BehaviorSubject to hold the list of employees
  private employeesSubject = new BehaviorSubject<Employee[]>([])

  // Observable that will emit the employee data
  employees$ = this.employeesSubject.asObservable()

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseURL)
      .pipe(tap(data => this.employeesSubject.next(data))); // Update the employeesSubject with fetched data
  }

  getEmployeeById(empId: String): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseURL + '/' + empId)
  }

  createEmployee(newEmployee: Employee): Observable<Object> {
    return this.httpClient.post<Employee>(this.baseURL, newEmployee)
      .pipe(switchMap(() => this.getAllEmployees())); // Re-fetch and update employees list after creating
  }

  updateEmployee(empId: String, updatedEmployee: Employee): Observable<Object> {
    return this.httpClient.put(this.baseURL + '/' + empId, updatedEmployee)
      .pipe(switchMap(() => this.getAllEmployees())); // Re-fetch and update employees list after updating
  }

  deleteEmployee(empId: String): Observable<Object> {
    return this.httpClient.delete(this.baseURL + '/' + empId)
      .pipe(switchMap(() => this.getAllEmployees())); // Re-fetch and update employees list after deleting
  }
}
