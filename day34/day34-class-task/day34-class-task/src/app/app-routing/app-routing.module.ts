import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ListEmployeeComponent } from '../components/listEmployee/list-employee.component';
import { CreateEmployeeComponent } from '../components/createEmployee/create-employee.component';
import { DetailsEmployeeComponent } from '../components/detailsEmployee/details-employee.component';
import { UpdateEmployeeComponent } from '../components/updateEmployee/update-employee.component';

const routes: Routes = [
  { path: "employeeList", component: ListEmployeeComponent },
  { path: "employeeCreate", component: CreateEmployeeComponent },
  { path: "employeeDetails/:id", component: DetailsEmployeeComponent },
  { path: "updateEmployee/:id", component: UpdateEmployeeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
