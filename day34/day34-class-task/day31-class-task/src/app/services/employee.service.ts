import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/v1/employees"

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseURL)
  }

  getEmployeeById(empId: String): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseURL + '/' + empId)
  }

  createEmployee(newEmployee: Employee): Observable<Object> {
    return this.httpClient.post<Employee>(this.baseURL, newEmployee)
  }

  updateEmployee(empId: String, updatedEmployee: Employee) {
    return this.httpClient.put(this.baseURL + '/' + empId, updatedEmployee)
  }

  deleteEmployee(empId: String) {
    return this.httpClient.delete(this.baseURL + '/' + empId)
  }
  
}
