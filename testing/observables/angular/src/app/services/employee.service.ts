import { inject, Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  private httpClient = inject(HttpClient)

  private apiURL = "http://localhost:8080/api/employees"


  // Create a BehaviourSubject with initial empty array
  private employeesSubject = new BehaviorSubject<Employee[]>([])              
      // Behaviour subject is like a container that
      //    - Holds the current value (in this case, the employee list)
      //    - Remembers the latest value
      //    - Gives the current value to any new subscriber
      //    - Notifies all subscribers when the value changes


  // Expose the BehaviourSubject as an Observable (using the $ convention)
  employees$: Observable<Employee[]> = this.employeesSubject.asObservable()
      // This creates a public property employees$ that exposes our BehaviourSubject as a read-only Observable
      //    - .asObservable() to prevent components from directly modifying the BehavourSubject, they can only subscribe to changes


  ngOnInit(): void {
      this.loadAllEmployees()
  }


  loadAllEmployees(): void {
    this.httpClient.get<Employee[]>(`${this.apiURL}/getAll`).subscribe({    // Makes a HTTP GET request to api endpoint, expecting an array of Employee objects in response
                                                                            //    .subscribe() start the HTTP request and sets up handlers for the response
      next: (data) => {                                                     // When data is recieved successfully
        console.log('Employees loaded: ', data)                             // Logs the data
        this.employeesSubject.next(data);                                   // Updates the Behaviour Subject with the new employee data using .next(data) - this notifies all subscribers
      },
      error: (error) => {
        console.error('Error loading employees: ', error)
      }
    })
  }


  addEmployee(employee: Employee): Observable<any> {                            // Takes an employee object (without ID) and returns an Observable of type any, since SB endpoint doesn't return anything
                                                                                //    - Return type any means this method returns an asynchronous stream that will emit whatever SB returns, which could be success message, null, or anything else
    return this.httpClient.post<any>(`${this.apiURL}/addNew`, employee)         // Makes a HTTP POST request to api endpoint, sending the employee data
      .pipe(                                                                    // The .pipe() method allows us to chain RxJS operators to the Observable returned by http.post()
        tap( () => {                                                            // The tap operator lets us perform "side effects" on the Observable stream without changing the data flowing through it. In this case, we're not even using the response data (that's why there's no parameter in the arrow function)
          this.loadAllEmployees()
          console.log('Employee added, refreshing list')
        }))                                                                  

  }

}
