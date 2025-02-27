import { Component, ViewChild } from '@angular/core';
import { ListEmployeeComponent } from './components/listEmployee/list-employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'day34-class-task';

  @ViewChild(ListEmployeeComponent)
  listEmployeeComponent!: ListEmployeeComponent

  onEmployeeAdded() {
    console.log('>>> Employee added, updating list');
    this.listEmployeeComponent.fetchEmployees()
  }
}
