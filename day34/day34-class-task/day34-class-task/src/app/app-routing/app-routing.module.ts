import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ListEmployeeComponent } from '../components/listEmployee/list-employee.component';
import { CreateEmployeeComponent } from '../components/createEmployee/create-employee.component';
import { DetailsEmployeeComponent } from '../components/detailsEmployee/details-employee.component';
import { UpdateEmployeeComponent } from '../components/updateEmployee/update-employee.component';
import { RouteGuardService } from '../services/route-guard.service';
import { TestComponent } from '../components/test/test.component';
import { DeactivateGuardService } from '../services/deactivate-guard.service';
import { DebounceComponent } from '../components/debounce/debounce.component';

const routes: Routes = [
  { path: "employeeList", component: ListEmployeeComponent },
  { path: "employeeCreate", component: CreateEmployeeComponent },
  { path: "employeeDetails/:id", component: DetailsEmployeeComponent },
  { path: "employeeUpdate/:id", component: UpdateEmployeeComponent, canActivate: [RouteGuardService] },
  { path: "test", component: TestComponent, canDeactivate: [DeactivateGuardService] },
  { path: "debounce", component: DebounceComponent },
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
